const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");

const usersFilePath = path.join(__dirname, "../data/users.json");
const UserModel = require("../models/users");

// Rutas y vistas
const usersController = {
  register: (req, res) => {
    res.render("register");
  },

  user: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let id = req.params.id;
    let user = users.find((user) => user.id == id);
    res.render("user", { user });
  },
  userRegister: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    let newUser = {
      id: users[users.length - 1].id + 1,

      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      rol: req.body.rol,
      avatar: req.file ? req.file.filename : "defaultAvatar.png",
    };
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    res.redirect("/");
  },
  userEdit: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let id = req.params.id;
    let user = users.find((user) => user.id == id);
    res.render("userEdit", { user });
  },
  userUpload: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let userToEdit = users.find((user) => req.params.id == user.id);

    let userEdited = {
      id: req.params.id,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol,
      avatar: req.file ? req.file.filename : userToEdit.avatar,
    };
    let indice = users.findIndex((user) => user.id == req.params.id);
    users[indice] = userEdited;

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
    res.redirect("/user/" + req.params.id);
  },
  userDelete: (req, res) => {
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    let finalUsers = users.filter((user) => user.id != req.params.id);
    fs.writeFileSync(usersFilePath, JSON.stringify(finalUsers, null, " "));

    res.redirect("/");
  },
  login: (req, res) => {
    res.render("login");
  },
  proccessLogin: (req, res) => {
    let userToLogin = UserModel.findByField("email", req.body.correo);

    if (userToLogin) {
      let isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      if (isOkThePassword) {
        delete userToLogin.password;
        req.session.userLogged = userToLogin;
        return res.redirect("/");
      }
      return res.render("login", {
        errors: {
          email: {
            msg: "Las credenciales son inválidas",
          },
        },
      });
    }

    return res.render('login', {
        errors: {
            email: {
                msg: 'No se encuentra este email en nuestra base de datos'
            }
        }
    });

  },
};

module.exports = usersController;
