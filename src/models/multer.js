const express = require('express');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, 'public/img/users');
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_avatar${path.extname(file.originalname)}`;
        cb(null, filename);
    }
})

const uploadFile = multer({storage:storage}).single('imagen');

module.exports = uploadFile;