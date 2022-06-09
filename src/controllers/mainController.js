const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

// Rutas y vistas
const mainController = {
    home: (req, res) => {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        let categoryDrone = [];
        products.forEach(product => {
            if(product.category == 'drone'){
                categoryDrone.push(product);
               
            }
            
           });  
        res.render('home', {
			products: categoryDrone
		});
    }
}

module.exports = mainController;