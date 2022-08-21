const { resolveNaptr } = require("dns");
const fs = require("fs");
const path = require("path");
const db = require('../../database/models');

const apiUsersController = {
    usersList: (req, res) => {
        db.User.findAll()
           .then(users => {
            let usersInput = [];
            let userTemp = {};
            users.forEach(user => {
                userTemp = {
                    user_id: user.user_id,
                    name: user.name,
                    lastName: user.lastname,
                    email: user.email,
                    detailUrl: 'http://localhost:5000/api/users/' + user.user_id
                }
                usersInput.push(userTemp);
            });
            let usersResponse = {
                total: users.length,
                data: usersInput,
                status: 200
            };
            res.json(usersInput);
           })
    },
    userDetail: (req, res) => {
        db.User.findByPk(req.params.user_id, {include: [{association: "roles"}]})
        .then(user => {
            let userOut = {};
            if (user) {
                let userBDInput = {
                    user_id: user.user_id,
                    name: user.name,
                    lastName: user.lastName,
                    email: user.email
                }
    
                userOut = {
                    data: {
                        userToSend: userBDInput,
                        imageUrl: `/images/users/` + user.avatar
                    },
                    status: 200
                };
                res.json(userOut);
            }else{
                res.json({error: "No se encuentra el usuario solicitado", status: 404});
            }
      }) 
    }
};

module.exports = apiUsersController;