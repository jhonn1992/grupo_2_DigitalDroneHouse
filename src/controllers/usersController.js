const fs = require("fs");
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const usersFilePath = path.join(__dirname, "../data/users.json");
const UserModel = require("../models/users");
const db = require('../database/models');

// Rutas y vistas
const usersController = {
  register: (req, res) => {
    res.render("register");
  },

  user: (req, res) => {
      db.User.findByPk(req.params.id, {include: [{association: "roles"}]})
      .then(user => {
        res.render("user", { user });
      }) 
  },
  userRegister: (req, res) => {
    db.User.findAll({where: {email: req.body.email}})
           .then(resultado => {
            if(resultado.length > 0){
              let errors = {
                email: {msg: 'User already exist'}
              };
              console.log(req.body);
              res.render("register", {
                errors: errors,
                oldData: req.body,
              });
            }
           }); 
 if (validationResult(req).errors.length > 0) {
      let userToCreate = {  
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        rol: req.body.rol,
        avatar: req.file ? req.file.filename : "defaultAvatar.png",
      };
      res.render("register", {
        userToCreate: userToCreate,
        errors: validationResult(req).mapped(),
        oldData: req.body,
      });
} else{
  let userRolConvert = req.body.rol;
  let recibeUserRolConvert = 0;
  
  switch (userRolConvert) {
    case "vendedor":
      recibeUserRolConvert = 3;
      break;
      case "cliente":
        recibeUserRolConvert = 2;
        break;
      default: 
      break; 
  }

  db.User.create (   
    {
      user_id: 0,
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      rol_id: recibeUserRolConvert,
      avatar: req.file ? req.file.filename : "defaultAvatar.png"
    })
     .then(()=> {
       return res.redirect("/")})            
     .catch(error => res.send(error));
  }},
  userEdit: (req, res) => {
    db.User.findByPk(req.params.id, {include: [{association: "roles"}]})
    .then(user => {
      res.render("userEdit", { user });
    }) 
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
    let userId = req.params.id;
    db.User.destroy({
      where: {user_id: userId}, force: true
    })
    .then(()=>{
      return res.redirect('/')})
    .catch(error => res.send(error));
  },
  login: (req, res) => {
    res.render("login");
  },
  proccessLogin: (req, res) => {
    let userToLogin;
    //let userToLogin = UserModel.findByField("email", req.body.correo);
    db.User.findAll({where: {email: req.body.correo}})
           .then(user => {
            userToLogin = user[0];

           if (user.length > 0) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
              //delete userToLogin.password;
              req.session.userLogged = userToLogin;  
              
              if(req.body.remember_user){ // remmeber_user
                res.cookie("userEmail", req.body.correo, { maxAge:( 1000 * 60) * 2 })
              };

              return res.redirect("/user/" + req.session.userLogged.user_id);  
            };
          }else{
            res.send("Ese correo no está en la BD");
           }
     })
     .catch(error => res.send(error));
  },
  userNotFound: (req, res) => {
    //Pendiente terminar función
    return res.redirect("/login");
  },
  logout: (req, res) => {
    res.clearCookie("userEmail");// detruir cookie loggout 
    req.session.destroy();
    return res.redirect("/");
  },

  profile: (req, res) => { //remmenber user profile
    return res.render("userProfile", {
      user: req.session.userLogged
    });
  }

};

module.exports = usersController;
