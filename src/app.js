const express = require('express');
const path = require('path');
const app = express();

// Se importan los Routers

const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const productDetailRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

app.set('views', path.join(__dirname, '/views'));

// const publicPath = path.resolve(__dirname, './public');

// app.use(express.static(publicPath));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Servidor escuchando
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000: http://localhost:5000/');
})

// Rutas y vistas
app.use('/', mainRouter);

app.use('/', productsRouter);

app.use('/', usersRouter);

/* ---------------RUTAS DE LOS BOTONES EN FORMULARIOS LOGIN Y REGISTER--------------- */

