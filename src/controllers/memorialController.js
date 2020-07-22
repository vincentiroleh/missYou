const Memorial = require('../models/memorialModel');
const User = require('../models/userModel');

class memorialController {
  static createMemorial(req, res) {
    const id = { _id: req.body.user };
    const value = { ...req.body, user: id, image: req.file.path };

    User.findOne(id)
      .then(() => Memorial.create(value)
        .then((data) => {
          res.status(200).json({
            status: 200,
            message: `${data.firstname}'s memorial page created successfully`,
            data,
          });
        }))
      .catch((err) => {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
      });
  }
}

module.exports = memorialController;
