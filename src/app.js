const express = require('express');
const path = require('path');
const app = express();

// Se importan los Routers

const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '../public')));  

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 

// Servidor escuchando
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000: http://localhost:5000/');
})

// Rutas y vistas
app.use('/', mainRouter);

app.use('/', usersRouter);

app.use('/productList', productsRouter);

/* ---------------RUTAS DE LOS BOTONES EN FORMULARIOS LOGIN Y REGISTER--------------- */

