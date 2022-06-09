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
    },
    productCreatePOST: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        
        let featuresEntry = req.body.features;
        let featuresSave = [];
        featuresEntry.forEach(feature => {
            if(feature != ''){
                featuresSave.push(feature);
            }
           });

        let newProduct = {
            id: products[products.length - 1].id + 1,
            productName: req.body.nombre,
            reference: req.body.reference,
            description: req.body.descripcion,
            image: req.file.filename,
            category: req.file.filename,
            price: req.body.categoria,
            features: featuresSave
        }
        products.push(newProduct);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
        res.redirect("/productList");
        
    }
}

module.exports = productsController;    