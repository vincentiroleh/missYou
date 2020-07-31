/* eslint-disable no-param-reassign */
const Memorial = require('../models/memorialModel');

class galleryController {
  static updatePhotos(req, res) {
    const id = { _id: req.params.id };
    const values = { ...req.body, photos: req.files.map((file) => file.path) };
    Memorial.findOne(id)
      .then((memorial) => {
        const newPhotos = [...memorial.photos, ...values.photos];
        memorial.photos = newPhotos;
        memorial.save(memorial);
        res.status(200).json({
          status: 200,
          message: 'Photo added successfully',
          photos: memorial.photos,
        });
      }).catch((err) => res.status(400).json({
        status: 400,
        error: err.message,
      }));
  }
}

module.exports = galleryController;
