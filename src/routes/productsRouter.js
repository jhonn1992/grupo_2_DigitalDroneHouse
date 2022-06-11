const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

const productsController = require('../controllers/productsController');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/img/products');
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, filename);
    }
})

const uploadFile = multer({storage: storage});

const validations = [
    body('nombre').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('precio').notEmpty().withMessage('Tienes que escribir un precio'),
    body('reference').notEmpty().withMessage('Tienes que escribir una referencia'),
    body('imagen').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];
        if(!file) {
            throw new Error('Sube una imagen');
        } else {
            let fileExtesion =  path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtesion)) {
                throw new Error(`Las extensiones de archivos permitidas son${acceptedExtensions.join(', ')}`);
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