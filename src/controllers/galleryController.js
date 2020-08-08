/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
const Memorial = require('../models/memorialModel');
const User = require('../models/userModel');
const mailer = require('../helper/mailer');

class galleryController {
  static async updatePhotos(req, res) {
    const id = { _id: req.params.id };
    const values = { ...req.body, photo: req.file.path };
    const memorial = await Memorial.findOne(id);
    const user = await User.findOne({ _id: memorial.user });
    try {
      if (memorial === null) {
        return res.status(400).json({
          message: 'Memorial with the given id does not exist',
        });
      }
      memorial.photos.push(values);
      memorial.save();
      res.status(200).json({
        status: 200,
        message: 'Photo added successfully',
        photos: memorial.photos,
      });
      const message = `
      <p> 
        <p> 
          ${values.name} has uploaded a photo on <a href="www.missyou.io/memorial/${memorial.webAddress}"> ${memorial.firstname}'s Memorial Page</a>
        </p>  

        <p> 
          <img src="${values.photo}" alt="An image">
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
      mailer(user.email, `New photo upload on ${memorial.firstname}'s Memorial Page`, message);
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}

module.exports = galleryController;
