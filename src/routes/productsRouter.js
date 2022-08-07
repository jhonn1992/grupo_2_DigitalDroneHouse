const express = require('express');
const router = express.Router();
const path = require('path');
const uploadFile = require('../models/multer');
const { check } = require('express-validator');

const productsController = require('../controllers/productsController');

const validations = [
    check('nombre').notEmpty().withMessage('Tienes que escribir un nombre')
                    .isLength({min: 5}).withMessage('El nombre debe tener minimo 5 caracteres'),
    check('precio').notEmpty().withMessage('Tienes que escribir el precio'),
    check('reference').notEmpty().withMessage('Tienes que escribir una referencia'),
    check('categoria').notEmpty().withMessage('Tienes que seleccionar una categoría'),
    check('imagen').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
        if(!file) {
            throw new Error('Upload a product image');
        } else {
            let fileExtesion =  path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtesion)) {
                throw new Error(`Allowed extensions ${acceptedExtensions.join(', ')}`);
            }
        }
        return true
    })
];

router.get('/shopping-cart', productsController.shoppingCart);
router.get('/shopping-cart/:id', productsController.shoppingCartProductDetail);
router.get('/productDetail/:id', productsController.productDetail);
router.get('/productEdit/:id', productsController.productEdit);
router.put('/productEdit/:id', uploadFile.single('imagen'), validations, productsController.productUpdate);
router.get('/productCreate', productsController.productCreate);
router.post('/', uploadFile.single('imagen'), validations, productsController.productCreatePOST);
router.get('/', productsController.productList);

router.delete('/productDelete/:id', productsController.productDelete);

module.exports = router;