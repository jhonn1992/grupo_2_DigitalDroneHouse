const express = require("express");
const router = express.Router();

const apiUserController = require("../../controllers/api/apiUsersController.js");

router.get("/users/", apiUserController.usersList);
router.get("/users/:user_id", apiUserController.userDetail);

module.exports = router;