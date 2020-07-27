/* eslint-disable no-underscore-dangle */
const Memorial = require('../models/memorialModel');
const User = require('../models/userModel');

class memorialController {
  static createMemorial(req, res) {
    const id = { _id: req.body.userID };
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

  static getMemorials(req, res) {
    Memorial.find({})
      .populate('user')
      .then((memorials) => {
        res.status(200).json({
          status: 200,
          message: 'Memorials retrieved successfully',
          memorials,
        });
      }).catch((err) => {
        res.status(404).json({
          status: 400,
          message: err.message,
        });
      });
  }

  static getMemorial(req, res) {
    const id = { _id: req.params.id };
    Memorial.findOne(id)
      .populate('user')
      .then((memorial) => {
        res.status(200).json({
          status: 200,
          message: 'Memorial retrieved successfully',
          memorial,
        });
      }).catch((err) => {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
      });
  }

  static getUserMemorials(req, res) {
    Memorial.find({ user: req.user._id })
      .populate('user')
      .then((memorials) => {
        res.status(200).json({
          status: 200,
          message: 'Memorials retrieved successfully',
          memorials,
        });
      }).catch((err) => {
        res.status(400).json({
          status: 400,
          message: err.message,
        });
      });
  }

  static updateMemorial(req, res) {
    const id = { _id: req.params.id };
    const value = { ...req.body, image: req.file.path };
    Memorial.updateOne(id, {
      $set: value,
    })
      .then(() => res.status(200).json({
        status: 200,
        message: 'Memorial Page updated successfully',
      }))
      .catch((err) => res.status(404).json({
        status: 404,
        message: err.message,
      }));
  }

  static deleteMemorial(req, res) {
    const memorialId = { _id: req.body.id };
    Memorial.deleteOne(memorialId)
      .then(() => res.status(200).json({
        status: 200,
        message: 'Memorial page removed successfully',
      }))
      .catch((err) => res.status(400).json({
        status: 400,
        message: err.message,
      }));
  }
}

module.exports = memorialController;
