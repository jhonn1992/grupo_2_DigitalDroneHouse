const express = require('express');
const router = express.Router();
const path = require('path')
const uploadFile = require('../models/multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const anotherUserAccountMiddleware =require('../middlewares/anotherUserAccountMiddleware');
const { check } = require('express-validator');

const validations = [
    check('name').notEmpty().withMessage('Type your name')
                    .isLength({min: 2}).withMessage('Min length 2 characters'),
    check('lastName').notEmpty().withMessage('Type your last name')
                    .isLength({min: 2}).withMessage('Min length 2 characters'),
    check('email').isEmail().withMessage('You must type a valid email'),
    check('password').notEmpty().withMessage('You must type a password')
                        .isLength({min: 8}).withMessage('Your password must have at least 8 characters'),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
        if(!file) {
            throw new Error('Upload a profile image');
        } else {
            let fileExtesion =  path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtesion)) {
                throw new Error(`Allowed extensions ${acceptedExtensions.join(', ')}`);
            }
        }
        return true
    })
]

const usersController = require('../controllers/usersController');
const { createRequire } = require('module');

router.get('/user', usersController.userNotFound);
router.get('/register', guestMiddleware, usersController.register);
router.post('/', uploadFile.single('avatar'), validations, usersController.userRegister);
router.get('/user/:user_id?', authMiddleware, anotherUserAccountMiddleware, usersController.user);
router.get('/user/edit/:id', authMiddleware, anotherUserAccountMiddleware, usersController.userEdit);
router.put('/user/edit/:id', uploadFile.single('avatar'), validations, authMiddleware, usersController.userUpload);
router.delete('/user/userDelete/:id', authMiddleware, usersController.userDelete);
router.get('/login', guestMiddleware, usersController.login);
router.get('/logout', usersController.logout);

router.post('/register', validations, usersController.proccessLogin);

module.exports = router;