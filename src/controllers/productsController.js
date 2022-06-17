const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

const productsFilePath = path.join(__dirname, "../data/products.json");

// Rutas y vistas
const productsController = {
  shoppingCart: (req, res) => {
    res.redirect("/productList/");
  },
  shoppingCartProductDetail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let id = req.params.id;
    let productToBuy = products.find((product) => product.id == id);
    res.render("shopping-cart", { productToBuy });
  },
  productDetail: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let id = req.params.id;
    let productDetail = products.find((product) => product.id == id);
    res.render("productDetail", { productDetail });
  },
  productEdit: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    let id = req.params.id;
    let productToEdit = products.find((product) => product.id == id);
    res.render("productEdit", { productToEdit });
  },
  productUpdate: (req, res) => {
    if (validationResult(req).errors.length > 0) {
      let featuresEntry = req.body.features;
      let featuresSave = [];
      featuresEntry.forEach((feature) => {
        if (feature != "") {
          featuresSave.push(feature);
        }
      });

      let productToEdit = [];
      productToEdit = {
        id: req.params.id,
        productName: req.body.nombre,
        reference: req.body.reference,
        image: req.file ? req.file.filename : productToEdit.image,
        category: req.body.categoria,
        price: req.body.precio,
        features: featuresSave,
      };

      res.render("productEdit", {
        productToEdit: productToEdit,
        errors: validationResult(req).mapped(),
        oldData: req.body,
      });
      
    } else {
      const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
      let productToEdit = products.find(
        (product) => req.params.id == product.id
      );

      let featuresEntry = req.body.features;
      let featuresSave = [];
      featuresEntry.forEach((feature) => {
        if (feature != "") {
          featuresSave.push(feature);
        }
      });

      let editedProduct = {
        id: req.params.id,
        productName: req.body.nombre,
        reference: req.body.reference,
        image: req.file ? req.file.filename : productToEdit.image,
        category: req.body.categoria,
        price: req.body.precio,
        features: featuresSave,
      };

      let indice = products.findIndex((product) => product.id == req.params.id);
      products[indice] = editedProduct;

      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
      res.redirect("/productList/productDetail/" + req.params.id);
    }
  },
  productCreate: (req, res) => {
    res.render("productCreate");
  },
  productList: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
    res.render("productList", {
      products,
    });
  },
  productCreatePOST: (req, res) => {
    if (validationResult(req).errors.length > 0) {
      return res.render("productCreate", {
        errors: validationResult(req).mapped(),
        oldData: req.body,
      });
    } else {
      const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

      let featuresEntry = req.body.features;
      let featuresSave = [];
      featuresEntry.forEach((feature) => {
        if (feature != "") {
          featuresSave.push(feature);
        }
      });

      let newProduct = {
        id: products[products.length - 1].id + 1,
        productName: req.body.nombre,
        reference: req.body.reference,
        image: req.file.filename,
        category: req.body.categoria,
        price: req.body.precio,
        features: featuresSave,
      };
      products.push(newProduct);
      fs.writeFileSync(productsFilePath, JSON.stringify(products, null, " "));
      res.redirect("/productList");
    }
  },
  productDelete: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

    let finalProducts = products.filter(
      (product) => product.id != req.params.id
    );
    fs.writeFileSync(
      productsFilePath,
      JSON.stringify(finalProducts, null, " ")
    );

    res.redirect("/productList");
  },
};

module.exports = productsController;
