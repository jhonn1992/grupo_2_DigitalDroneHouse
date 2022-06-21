const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
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

router.get('/register', usersController.register);
router.post('/', uploadFile.single('avatar'),usersController.userRegister);
router.get('/user/:id?', usersController.user);
router.get('/user/edit/:id', usersController.userEdit);
router.put('/user/edit/:id',uploadFile.single('avatar'),usersController.userUpload);
router.get('/login', usersController.login);

module.exports = router;