const express = require('express');
const path = require('path');
const multer = require('multer');

let finalFolder = '';

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        if(req.headers.referer.includes('product')){
            finalFolder = 'products';
        } else{
            finalFolder = 'users'
        } 
        cb(null,  `public/img/${finalFolder}`);
    },
    filename: (req, file, cb) => {
        filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, filename);
    }
})

var uploadFile = multer({storage:storage});


module.exports = uploadFile;