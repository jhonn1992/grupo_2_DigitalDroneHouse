const fs = require('fs');
const path = require("path");
const usersFilePath = path.join(__dirname, "../data/users.json");
const UserModel = {
	getData: function () {
		 const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
         return users;
	},
    findAll: function () {
		return this.getData();
	},
    findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	}
};

module.exports = UserModel;
