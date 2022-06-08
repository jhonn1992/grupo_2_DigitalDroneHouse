const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

// Rutas y vistas
const productsController = {
    shoppingCart: (req, res) => {
        res.render('shopping-cart');
    },
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    productEdit: (req, res) => {
        res.render('productEdit');
    },
    productCreate: (req, res) => {
        res.render('productCreate');
    },
    productList: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        res.render('productList', {
			products
		});
        console.log(products);
    }
}

module.exports = productsController;