const fs = require("fs");
const path = require("path");
const db = require('../../database/models');

const apiProductsController = {
    productList: (req, res) => {
        db.Products.findAll()
        .then(products => {
            let categoryDroneList = 0;
            let categoryAccesoryList = 0;
            for (let i = 0; i < products.length; i++) {
                if (products[i].category_id == 1) {
                    categoryDroneList++;
                } 
                if (products[i].category_id == 2) {
                    categoryAccesoryList++;
                }                               
            }

            let productsInput = [];
            let productTemp = {};
            products.forEach(product => {
                productTemp = {
                    product_id: product.product_id,
                    product_name:product.product_name,
                    detailUrl: 'http://localhost:5000/api/products/' + product.product_id,
                    category_id: product.category_id,
                    price: product.price,
                    features1: product.features1,
                    features2: product.features2,
                    features3: product.features3,
                    features4: product.features4,
                    dbRelations: ["category_id"]
                }
                productsInput.push(productTemp);
            });
            let productsResponse = {
                stock : products.length,
                countByCategory: {
                    drone: categoryDroneList,
                    accesory: categoryAccesoryList
                },
                products : productsInput
            };

          res.json(productsResponse);
        }).catch (error => {
          res.send(error);
        });
    },
    productDetail: (req, res) => {
        db.Products.findByPk(req.params.id)
        .then(product => {  
             if (product) {
                let productOut = {
                    data: {
                        productToSend: product,
                        dbRelations: ["category_id"],
                        imageUrl: `/images/products/` + product.image,
                    },
                    status: 200
                }
                res.json(productOut); 
             }else{
                res.json({error: "No se encuentra el producto solicitado", status: 404});
             }
        }) 
    }
}

module.exports = apiProductsController;