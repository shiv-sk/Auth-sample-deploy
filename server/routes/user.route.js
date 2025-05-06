const express = require("express");
const Router = express.Router();
const {register , login , logOut , currentUser , getAllUsers } = require("../controllers/user.controller");
const {userRegisterSchema , userLoginSchema } = require("../validation/user.validation");
const validateInput = require("../middlewares/validation.middleware"); 
Router.route("/register").post(validateInput(userRegisterSchema) , register);
Router.route("/login").post(validateInput(userLoginSchema) , login);
Router.route("/logout").get(logOut);
Router.route("/me").get(currentUser);
Router.route("/").get(getAllUsers);

module.exports = Router;