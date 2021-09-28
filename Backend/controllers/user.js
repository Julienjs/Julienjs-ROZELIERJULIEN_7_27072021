const { User } = require('../models/index');
//tout les utilisateurs
module.exports.getAllUsers = (req, res, next) => {
    User.findAll({
        attributes: ["id", "email", "username", "imageUrlUser", "description", "createdAt", "isAdmin"]
    })
        .then(users => res.status(200).json({ message: 'utilisateurs disponible', users }));
};

//récupération d'un utilisateur par l'id
module.exports.IdUser = (req, res, next) => {
    User.findOne({
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
    }).then(() => res.status(200).json({ message: 'Compte supprimé' }));
};

//modifié un profil
module.exports.modifyProfil = (req, res, next) => {
    User.update(
        {
            description: req.body.description,
            // imageUrlUser: imageUrl
        },
        {
            where: { id: req.params.id }
        }
    ).then(() => res.status(200).json({ message: 'La description à bien été modifiée' }))
        .catch(err =>
            res.status(500).json({ err })
        );
};


module.exports.updateImg = (req, res, next) => {
    let imageUrl = null;
    if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    User.update(
        {
            imageUrlUser: imageUrl
        },
        {
            where: { id: req.params.id }
        }
    ).then(() => res.status(200).json({ message: 'La photo de profil est bien modifiée' }))
        .catch(err =>
            res.status(500).json({ err })
        );

};