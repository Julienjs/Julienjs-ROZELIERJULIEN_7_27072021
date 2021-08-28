
const fs = require('fs');
const { Post, User, Comment } = require('../models/index');

//création d'un commentaire
exports.createComment = (req, res) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const comment = new Comment({
        userId: req.token.userId,
        postId: req.params.postId,
        comment: req.body.comment,
        imageUrl: imageUrl
    });
    comment.save()
        .then((comment) => res.status(201).json(comment))
        .catch(error => res.status(400).json({ error: error }));
};

// supprimer un commentaire
module.exports.deleteComment = (req, res, next) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé' }))
        .catch(error => res.status(400).json({ error: error() }));
};

//modifier un
module.exports.modifyComment = (req, res, next) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    Comment.update(
        {
            comment: req.body.message,
            imageUrl: imageUrl
        },
        {
            where: { id: req.params.id }
        }
    )
        .then(() => res.status(200).json({ message: 'Publication modifiée' }))
        .catch(error => res.status(400).json({ error: error() }));
};

//récuperer un commentaire par son id
// exports.findOneComment = (req, res) => {
//     Comment.findAll({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(post => res.status(200).json(post))
//         .catch(error => res.status(400).json({ error: error }));
// };

//tout les post
// module.exports.getAllComments = (req, res, next) => {
//     Comment.findAll({
//         where: { id: req.params.id }
//     })
//         .then(Comments => res.status(200).json({ message: 'Toutes les commentaires', Comments }))
//         .catch(error => res.status(400).json({ error: error }));
// };

// // supprimer un post 
// module.exports.deletePost = (req, res, next) => {
//     Post.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(() => res.status(200).json({ message: 'Publication supprimé' }))
//         .catch(error => res.status(400).json({ error: error() }));
// };



