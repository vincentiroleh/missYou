const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

class UserController {
  static createUser(req, res) {
    const {
      name,
      email,
      password,
    } = req.body;

    const userData = {
      name,
      email,
    };

    User.register(userData, password, (err) => {
      if (err) {
        return res.status(400).json({
          status : 400,
          message : err.message,
        });
      }
      return passport.authenticate('local')(
          req, res, () => res.status(200).json({
            status : 200,
            message : 'Account created successfully',
            data : userData,
          }));
    });
  }

  static loginUser(req, res, next) {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user || user.role === 'Admin') {
        return res.status(400).json({
          status : 400,
          message : 'failure',
          error : 'Invalid email or password',
        });
      }
      return req.logIn(user, {session : false}, (error) => {
        if (error) {
          return next(err);
        }
        const token =
            jwt.sign({user}, process.env.SECRET, {expiresIn : '168h'});
        return res.status(200).json({
          status : 200,
          message : 'Authenticated',
          token,
          user,
        });
      });
    })(req, res, next);
  }

  static logoutUser(req, res) {
    req.logout();
    res.status(200).json({
      status : 200,
      message : 'Successfully logged out',
    });
  }
}

module.exports = UserController;
