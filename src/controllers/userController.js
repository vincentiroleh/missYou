const passport = require('passport');
const jwt = require('jsonwebtoken');
const mailer = require('../helper/mailer');
const User = require('../models/userModel');

class UserController {
  static createUser(req, res) {
    const { name, email, password } = req.body;

    const user = {
      name,
      email,
    };

    User.register(user, password, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          message: err.message,
        });
      }
      const token = jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '168h',
      });
      const message = `
      <p> 
         <b> Dear ${user.name}, </b>

          <p> 
            Welcome to MissYou, and thank you for joining our community.
          </p>

          <p> 
            Please make a note of your account login email: <br> 
            ${user.email}
          </p>
          
          <p> 
            If you have any questions about our service, or need any assistance with your memorial, 
            please feel free to contact us at <br> 
            missyou@gmail.com.
          </p>

          <small> 
            Kind Regards, <br>
            MissYou Team <br>
            www.missyou.com
          </small>
      </p>
      `;
      mailer(user.email, 'Welcome to MissYou', message);
      return passport.authenticate('local')(req, res, () => res.status(200).json({
        status: 200,
        message: 'Account created successfully',
        token,
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
          status: 400,
          message: 'failure',
          error: 'Invalid email or password',
        });
      }
      return req.logIn(user, { session: false }, (error) => {
        if (error) {
          return next(err);
        }
        const token = jwt.sign({ user }, process.env.SECRET, {
          expiresIn: '168h',
        });
        return res.status(200).json({
          status: 200,
          message: 'Authenticated',
          token,
          user,
        });
      });
    })(req, res, next);
  }

  static logoutUser(req, res) {
    req.logout();
    res.status(200).json({
      status: 200,
      message: 'Successfully logged out',
    });
  }
}

module.exports = UserController;
