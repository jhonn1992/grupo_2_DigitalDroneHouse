// Rutas y vistas
const productsController = {
    shoppingCart: (req, res) => {
        res.render('shopping-cart');
    },
    productDetail: (req, res) => {
        res.render('productDetail');
    },
    edit: (req, res) => {
        res.render('edit');
    }
}

module.exports = productsController;