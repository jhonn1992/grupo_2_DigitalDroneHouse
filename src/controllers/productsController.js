const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require('../database/models');

const productsFilePath = path.join(__dirname, "../data/products.json");

// Rutas y vistas
const productsController = {
  shoppingCart: (req, res) => {
    res.redirect("/productList/");
  },
  shoppingCartProductDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then(product => {
        let features = [];

              if(product.features1 != null){
                features.push(product.features1);
              }
              if(product.features2 != null){
                features.push(product.features2);
              }
              if(product.features3 != null){
                features.push(product.features3);
              }
              if(product.features4 != null){
                features.push(product.features4);
              }
        res.render("shopping-cart", { productToBuy: product, features });
      }).catch (error => {
        res.send(error);
      });    
  },
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id)
            .then(product => {
              let features = [];

              if(product.features1 != null){
                features.push(product.features1);
              }
              if(product.features2 != null){
                features.push(product.features2);
              }
              if(product.features3 != null){
                features.push(product.features3);
              }
              if(product.features4 != null){
                features.push(product.features4);
              }
              res.render('productDetail', {productDetail: product, features}); 
            }) 
  },
  productEdit: (req, res) => {
    db.Products.findByPk(req.params.id)
    .then(product => {
      let features = [];

      if(product.features1 != null){
        features.push(product.features1);
      }
      if(product.features2 != null){
        features.push(product.features2);
      }
      if(product.features3 != null){
        features.push(product.features3);
      }
      if(product.features4 != null){
        features.push(product.features4);
      }
      res.render('productEdit', {productToEdit: product, features}); 
    }) 
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
      
      let featuresEntry = req.body.features;
      let featuresEntrySize = featuresEntry.length;
      let categoryConvert = 0;
      if(req.body.categoria == "drone"){
        categoryConvert = 1;
      } else{
        categoryConvert = 2;
      }

      db.Products.update (
        {
          id: 0,
          product_name: req.body.nombre,
          reference: req.body.reference,
          image: req.file ? req.file.filename : req.body.image_default,
          category_id: categoryConvert,
          price: req.body.precio,
          features1: featuresEntrySize >=1 ? featuresEntry[0] : null,
          features2: featuresEntrySize >=2 ? featuresEntry[1] : null,
          features3: featuresEntrySize >=3 ? featuresEntry[2] : null,
          features4: featuresEntrySize >=4 ? featuresEntry[3] : null
        },
        {
            where: {product_id: req.params.id}
        })
        .then(()=> {
          return res.redirect("/productList/productDetail/" + req.params.id)})           
        .catch(error => res.send(error));
    }
  },
  productCreate: (req, res) => {
    res.render("productCreate");
  },
  productList: (req, res) => {
    db.Products.findAll()
    .then(products => {
      res.render("productList", {
        products,
      });
    }).catch (error => {
      res.send(error);
    });
  },
  productCreatePOST: (req, res) => {
    if (validationResult(req).errors.length > 0) {
      return res.render("productCreate", {
        errors: validationResult(req).mapped(),
        oldData: req.body,
      });
    } else {
      let featuresEntry = req.body.features;
      let featuresEntrySize = featuresEntry.length;
      let categoryConvert = 0;
      if(req.body.categoria == "drone"){
        categoryConvert = 1;
      } else{
        categoryConvert = 2;
      }
      
      db.Products.create (
        {
          id: 0,
          product_name: req.body.nombre,
          reference: req.body.reference,
          image: req.file.filename,
          category_id: categoryConvert,
          price: req.body.precio,
          features1: featuresEntrySize >=1 ? featuresEntry[0] : null,
          features2: featuresEntrySize >=2 ? featuresEntry[1] : null,
          features3: featuresEntrySize >=3 ? featuresEntry[2] : null,
          features4: featuresEntrySize >=4 ? featuresEntry[3] : null
        })
        .then(()=> {
          return res.redirect("/productList")})            
        .catch(error => res.send(error));
    }
  },
  productDelete: (req, res) => {
    let productId = req.params.id;
    db.Products.destroy({
      where: {product_id: productId}, force: true
    })
    .then(()=>{
      return res.redirect('/productList')})
    .catch(error => res.send(error))
  },
};

module.exports = productsController;
