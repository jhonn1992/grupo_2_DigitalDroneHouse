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
    }
}

module.exports = productsController;