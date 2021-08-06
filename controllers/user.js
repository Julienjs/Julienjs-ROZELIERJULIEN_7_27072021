const { User } = require('../models/index');
//tout les utilisateurs
module.exports.getAllUsers = (req, res, next) => {
    User.findAll({
        attributes: ["id", "email", "username", "imageUrlUser", "description", "createdAt"]
    })
        .then(users => res.status(200).json({ message: 'utilisateurs disponible', users }));
};

//récupération d'un utilisateur par l'id
module.exports.IdUser = (req, res, next) => {
    User.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(userId => res.status(200).json({ message: 'id récupéré', userId }));
};

//supprimer un utilisateur 
module.exports.deleteUser = (req, res, next) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => res.status(200).json({ message: 'id supprimé' }));
};

//modifié un profil
module.exports.modifyProfil = (req, res, next) => {
    User.update(
        {
            description: req.body.description,
            password: req.body.password,
            username: req.body.username,
            imageUrlUser: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        },
        {
            where: { id: req.params.id }
        }
    ).then(() => res.status(200).json({ message: 'les modifications on bien été prises en compte' }))
};


