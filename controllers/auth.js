const { User } = require('../models/index');
const bcrypt = require('bcrypt');
// const newUser = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });

//création compte
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                imageUrlUser: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                description: req.body.description,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé!' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé!' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect!' });
                    }
                    res.status(200).json({
                        message: 'vous êtes connecté',
                        token: jwt.sign(
                            { userId: user.id },
                            '4bea540f75ac82d5dfea72aefd96d3c9',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};