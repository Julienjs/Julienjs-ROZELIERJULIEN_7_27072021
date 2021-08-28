// const Sauce = require('../models/Sauce');
const fs = require('fs');
const { Post, User, Comment } = require('../models/index');

//création d'un poste
exports.createPost = (req, res) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const post = new Post({
        userId: req.token.userId,
        message: req.body.message,
        imageUrlPost: imageUrl
    });

    post.save()
        .then((post) => res.status(201).json(post))
        .catch(error => res.status(400).json({ error: error }));
};


//tout les post
module.exports.getAllPost = (req, res, next) => {
    Post.findAll({
        include: [User, { model: Comment, include: User }]
    })
        .then(posts => res.status(200).json({ message: 'Toutes les publications', posts }))
        .catch(error => res.status(400).json({ error: error }));
};

// supprimer un post 
module.exports.deletePost = (req, res, next) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({ message: 'Publication supprimé' }))
        .catch(error => res.status(400).json({ error: error() }));
};

//récuperer un post par son id
exports.findOnePost = (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        }
    })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error: error }));
};

//modifier un post
module.exports.modifyPost = (req, res, next) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    Post.update(
        {
            message: req.body.message,
            imageUrlPost: imageUrl
        },
        {
            where: { id: req.params.id }
        }
    )
        .then(() => res.status(200).json({ message: 'Publication modifiée' }))
        .catch(error => res.status(400).json({ error: error() }));
};