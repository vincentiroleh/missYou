/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

function isAuthUser(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  return res.status(401).send({
    status: 401,
    message: 'Authorization required',
  });
}

function isAdmin(req, res, next) {
  const user = req.user;
  if (user.role === 'Admin') {
    next();
  } else {
    return res.status(401).send({
      status: 401,
      message: 'Authorization required',
    });
  }
}

function isClient(req, res, next) {
  const user = req.user;
  console.log(user);
  if (user.role === 'Client') {
    next();
  } else {
    return res.status(401).send({
      status: 401,
      message: 'Authorization required',
    });
  }
}

function verifyToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      auth: false,
      error: 'No token provided',
    });
  }
  token = token.split(' ')[1];
  // verify the token and expire
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        auth: false,
        message: 'Failed to authenticated token',
      });
    }
    req.user = decoded.user;
    next();
  });
}

module.exports = {
  isAuthUser,
  isAdmin,
  isClient,
  verifyToken,
};
