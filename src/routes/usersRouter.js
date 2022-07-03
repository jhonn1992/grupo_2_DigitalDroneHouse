const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const anotherUserAccountMiddleware =require('../middlewares/anotherUserAccountMiddleware');



const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_avatar${path.extname(file.originalname)}`;
        cb(null, filename);
    }
})

const uploadFile = multer({storage: storage});

const usersController = require('../controllers/usersController');
const { createRequire } = require('module');

router.get('/user', usersController.userNotFound);
router.get('/register', guestMiddleware, usersController.register);
router.post('/', uploadFile.single('avatar'),usersController.userRegister);
router.get('/user/:id?', authMiddleware, anotherUserAccountMiddleware, usersController.user);
router.get('/user/edit/:id', authMiddleware, usersController.userEdit);
router.put('/user/edit/:id',uploadFile.single('avatar'), authMiddleware, usersController.userUpload);
router.delete('/user/userDelete/:id', authMiddleware, usersController.userDelete);
router.get('/login', guestMiddleware, usersController.login);
router.get('/logout', usersController.logout);

router.post('/register', usersController.proccessLogin);

module.exports = router;