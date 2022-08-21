const express = require('express');
const router = express.Router();

const imageRouter = router;
const imagesController = require('../controllers/imagesController')

imageRouter.get('/products/:image', imagesController.getImageProducts)
imageRouter.get('/users/:image', imagesController.getImageUsers)


module.exports = imageRouter;