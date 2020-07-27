const memorialRoute = require('express').Router();
const { verifyToken } = require('../middleware/AuthUser');
const parser = require('../helpers/cloudinary');
const memorialController = require('../controllers/memorialController');

const authUrl = '/api/v1/auth/';

memorialRoute.post(
  `${authUrl}create-memorial`,
  verifyToken,
  parser().single('image'),
  memorialController.createMemorial,
);

memorialRoute.get(
  `${authUrl}memorials`,
  verifyToken,
  memorialController.getMemorials,
);
memorialRoute.get(
  `${authUrl}memorial/:id`,
  verifyToken,
  memorialController.getMemorial,
);
memorialRoute.get(
  `${authUrl}user-memorials`,
  verifyToken,
  memorialController.getUserMemorials,
);

memorialRoute.put(
  `${authUrl}update-memorial/:id`,
  verifyToken,
  parser().single('image'),
  memorialController.updateMemorial,
);

memorialRoute.delete(
  `${authUrl}delete-memorial`,
  verifyToken,
  memorialController.deleteMemorial,
);

module.exports = memorialRoute;
