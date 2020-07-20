const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const { userValidation, validate } = require('../helpers/validator');

const authUrl = '/api/v1/auth/';

userRouter.post(`${authUrl}signup`, userValidation(), validate, userController.createUser);
userRouter.post(`${authUrl}login`, userController.loginUser);
userRouter.post(`${authUrl}logout`, userController.logoutUser);

module.exports = userRouter;
