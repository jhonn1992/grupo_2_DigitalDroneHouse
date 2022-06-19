// Rutas y vistas
const usersController = {
    register: (req, res) => {
        res.render('register');
    },
    user: (req, res) => {
        res.render('user');
    },
    login: (req, res) => {
        res.render('login');
    }
}

module.exports = usersController;