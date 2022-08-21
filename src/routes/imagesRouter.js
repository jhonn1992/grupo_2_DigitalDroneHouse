const express = require('express');
const router = express.Router();

const imageRouter = router;
const imagesController = require('../controllers/imagesController')

imageRouter.get('/:image', imagesController.getImage)

module.exports = imageRouter;