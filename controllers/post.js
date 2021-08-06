// const Sauce = require('../models/Sauce');
const fs = require('fs');
const { Post, User } = require('../models/index');

//création d'un poste
exports.createPost = (req, res) => {
    User.findOne({ where: { id: req.body.userId } });
    const post = new Post({
        userId: "21",
        titre: req.body.titre,
        message: req.body.message,
        imageUrlPost: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    post.save()
        .then(() => res.status(201).json(post))
        .catch(error => res.status(400).json({ error: error }));
};


//tout les posts
module.exports.getAllPost = (req, res, next) => {
    Post.findAll({
        attributes: ["imageUrlPost", "createdAt"]
    })
        .then(posts => res.status(200).json({ message: 'Tout les posts', posts }));
};

