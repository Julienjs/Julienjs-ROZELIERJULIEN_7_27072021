const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//créer un objet
router.post('/:id', auth, multer, postCtrl.createPost);
router.get('/', postCtrl.getAllPost);
router.get('/:id', postCtrl.findOnePost);
router.delete('/:id', postCtrl.deletePost);
router.put('/:id', multer, postCtrl.modifyPost);
router.put('/:id/image', multer, postCtrl.modifyImagePost);
// router.post('/:id/like', auth, postCtrl.postLike);







module.exports = router;