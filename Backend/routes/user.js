const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');
const usersCtrl = require('../controllers/user');


const { rules, validate } = require('../middleware/validator');
const multer = require('../middleware/multer-config');
// router.post('/signup', userCtrl.signup);
router.post('/signup', rules(), validate, multer, authCtrl.signup);
router.post('/login', authCtrl.login);
router.get('/', usersCtrl.getAllUsers);
router.get('/:id', usersCtrl.IdUser);
router.delete('/:id', usersCtrl.deleteUser);
router.put('/:id', multer, usersCtrl.modifyProfil);
router.put('/:id/image', multer, usersCtrl.updateImg);




module.exports = router;