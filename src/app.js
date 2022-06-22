const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');

// Se importan los Routers

const mainRouter = require('./routes/mainRouter');
const productsRouter = require('./routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '../public')));  

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(methodOverride('_method')); 
app.use(session({
    secret: 'variable de session',
    resave: false,
    saveUninitialized: false
}));

app.use(userLoggedMiddleware);

// Servidor escuchando
app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000: http://localhost:5000/');
})

// Rutas y vistas
app.use('/', mainRouter);

app.use('/', usersRouter);

app.use('/productList', productsRouter);

/* ---------------RUTAS DE LOS BOTONES EN FORMULARIOS LOGIN Y REGISTER--------------- */

