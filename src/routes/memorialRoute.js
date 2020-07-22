const memorialRoute = require('express').Router();
const { verifyToken } = require('../middleware/AuthUser');
const parser = require('../helpers/cloudinary');
const memorialController = require('../controllers/memorialController');

const authUrl = '/api/v1/auth/';

memorialRoute.post(`${authUrl}create-memorial`, verifyToken, parser().single('image'), memorialController.createMemorial);

module.exports = memorialRoute;
