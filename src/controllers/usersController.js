const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");


// Rutas y vistas
const usersController = {
    register: (req, res) => {
        res.render('register');
    },
    
    user: (req, res) => {
        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        let id = req.params.id
        let user = users.find((user) => user.id == id);
        res.render('user' , {user});
    },
    login: (req, res) => {
        res.render('login');
    }
}

module.exports = usersController;