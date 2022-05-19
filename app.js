const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');

app.use(express.static(publicPath));

// Servidor escuchando
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000: http://localhost:5000/');
})

// Rutas y vistas
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
})

app.get('/shopping-cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/shopping-cart.html'));
})

app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
})

/* ---------------RUTAS DE LOS BOTONES EN FORMULARIOS LOGIN Y REGISTER--------------- */

app.post("/register", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/home.html"));
});

app.post("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./views/productDetail.html"));
});
