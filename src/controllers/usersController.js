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
      db.User.findByPk(req.params.user_id, {include: [{association: "roles"}]})
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
              res.render("register", {
                errors: errors,
                inputDataUser: req.body,
              });
            } else {
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
                  inputDataUser: req.body,
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
            };
            }

           }); 
 },
  userEdit: (req, res) => {
    db.User.findByPk(req.params.id, {include: [{association: "roles"}]})
    .then(user => {
      res.render("userEdit", { user });
    }) 
  },
  userUpload: (req, res) => {
    let userId = req.params.id;
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
    db.User.update(
        {
          user_id: req.params.id,
          name: req.body.name,
          lastName: req.body.lastName,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          rol_id: recibeUserRolConvert,
          avatar: req.file ? req.file.filename : req.body.image_default
        },
        {
            where: {user_id: userId}
        })
    .then(()=> {
        return res.redirect("/user/" + req.params.id)})            
    .catch(error => res.send(error))
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
    db.User.findAll({where: {email: req.body.correo}})
           .then(user => {
            userToLogin = user[0];

            if (user.length > 0) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
              delete userToLogin.password;
              
               req.session.userLogged = {
                user_id : userToLogin.user_id,
                name : userToLogin.name,
                lastName : userToLogin.lastName,
                email : userToLogin.email,
                rol_id : userToLogin.rol_id,
                avatar : userToLogin.avatar
              }

              if(req.body.remember_user){ // remmeber_user
                res.cookie("userEmail", req.body.correo, { maxAge:( 1000 * 60) * 2 })
              };
              return res.redirect("/user/" + req.session.userLogged.user_id);  
            };
            return res.render("login", {
              errors: {
                email: {
                  msg: "Las credenciales son inválidas",
                },
              },
            });
          }else{
            return res.render('login', {
              errors: {
                  email: {
                      msg: 'No se encuentra este email en nuestra base de datos'
                  }
              }
            });
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
