const express = require("express");
const router = express.Router();

const apiProductsController = require("../../controllers/api/apiProductsController.js");

router.get("/products/", apiProductsController.productList);
router.get("/products/:id", apiProductsController.productDetail);


module.exports = router;