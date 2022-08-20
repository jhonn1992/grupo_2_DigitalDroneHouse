const express = require("express");
const router = express.Router();

const apiProductsController = require("../../controllers/api/apiProductsController.js");

router.get("/products/", apiProductsController.productList);
router.get("/products/:id", apiProductsController.productDetail);
/* router.post("/movies/add", apiMainController.addMovie);
router.get("/movies/single/:id", apiMainController.movie);
router.get("/duck", apiMainController.duck); */


module.exports = router;