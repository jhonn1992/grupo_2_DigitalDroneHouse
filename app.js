const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

app.set('view engine', 'ejs');

// Servidor escuchando
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000: http://localhost:5000/');
})

// Rutas y vistas
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/home.ejs'));
})

app.get('/shopping-cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/shopping-cart.ejs'));
})

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/productDetail.ejs'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/register.ejs'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/views/login.ejs'));
})

/* ---------------RUTAS DE LOS BOTONES EN FORMULARIOS LOGIN Y REGISTER--------------- */

app.post("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/home.ejs"));
});

app.post("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./src/views/productDetail.ejs"));
});
