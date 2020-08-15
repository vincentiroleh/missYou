/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const Memorial = require('../models/memorialModel');
const User = require('../models/userModel');
const mailer = require('../helper/mailer');

class memorialController {
  static async createMemorial(req, res) {
    const id = { _id: req.body.userID };
    const value = { ...req.body, user: id, image: req.file.path };

    const user = await User.findOne(id);
    if (!value.image) return res.json({message: 'Please upload a file'})
    if (user === null) {
      return res.status(400).json({
        message: 'User with the given id not found',
      });
    }
    return Memorial.create(value)
      .then((data) => res.status(200).json({
        status: 200,
        message: `${data.firstname}'s memorial page created successfully`,
        data,
      }))
      .catch((err) => res.status(400).json({
        status: 400,
        message: err.message,
      }));
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
      })
      .catch((err) => {
        res.status(404).json({
          status: 400,
          message: err.message,
        });
      });
  }

  static async getMemorial(req, res) {
    const id = { _id: req.params.id };
    const memorial = await Memorial.findOne(id);
    try {
      if (memorial === null) {
        return res.status(400).json({
          message: 'Memorial with the given id does not exist',
        });
      }
      res.status(200).json({
        status: 200,
        message: 'Memorial retrieved successfully',
        memorial,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error,
      });
    }
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
      })
      .catch((err) => {
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

  static async updateTribute(req, res) {
    const id = { _id: req.params.id };
    const values = { ...req.body };
    const memorial = await Memorial.findOne(id);
    const user = await User.findOne({ _id: memorial.user });
    try {
      if (memorial === null) {
        return res.status(400).json({
          message: 'Memorial with the given id does not exist',
        });
      }
      memorial.tributes.push(values);
      memorial.save();
      res.status(200).json({
        status: 200,
        message: 'Tribute added successfully',
        tributes: memorial.tributes,
      });
      const message = `
    <p> 
      <p> 
        ${values.name} has shared a tribute on <a href="www.missyou.io/memorial/${memorial.webAddress}"> ${memorial.firstname}'s Memorial Page</a>
      </p>  
      <p> 
        <b> ${values.title} </b> <br> <br>

        ${values.tribute}
      </p>  
      <p> 
        <small> 
          Kind Regards, <br>
          MissYou Team <br>
          www.missyou.io
        </small>
      </P>
    </p>
    `;
      mailer(user.email, `New Tribute on ${memorial.firstname}'s Memorial Page`, message);
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}

module.exports = memorialController;
