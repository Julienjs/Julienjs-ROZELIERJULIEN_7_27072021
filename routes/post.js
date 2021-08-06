const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//créer un objet
router.post('/', auth, multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
//modifier un objet 
// router.put('/:id', auth, multer, postCtrl.modifyPost);
//suppression d'un objet
// router.delete('/:id', auth, multer, postCtrl.deletePost);
//recuperer un seul objet
// router.get('/:id', auth, postCtrl.getOnePost);
//recuperation tout les objets
// router.get('/', auth, postCtrl.getAllPosts);

// router.post("/:id/like", auth, postCtrl.likeDislike);

module.exports = router;