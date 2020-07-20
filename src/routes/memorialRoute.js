const memorialRoute = require('express').Router();
const verifyToken = require('../middleware/AuthUser');

const authUrl = '/api/v1/auth/';

memorialRoute.post(`${authUrl}create-memorial`, verifyToken);

module.exports = memorialRoute;
