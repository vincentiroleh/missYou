const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const { signupValidator, loginValidator, validate } = require('../helper/validator');

const authUrl = '/api/v1/auth/';

userRouter.post(`${authUrl}signup`, signupValidator(), validate, userController.createUser);
userRouter.post(`${authUrl}login`, loginValidator(), validate, userController.loginUser);
userRouter.post(`${authUrl}logout`, userController.logoutUser);

module.exports = userRouter;
