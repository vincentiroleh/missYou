const mongoose = require('mongoose');
const moment = require('moment');

const tributeSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  title: {
    type: String,
    // required: true,
  },
  tribute: {
    type: String,
    // required: true,
  },
});

const photoSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
});

const memorialSchema = new mongoose.Schema({
  firstname: {
    type: String,
    // required: true,
    trim: true,
  },
  lastname: {
    type: String,
    // required: true,
    trim: true,
  },
  gender: {
    type: String,
    // required: true,
    trim: true,
  },
  relationship: {
    type: String,
    // required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    // required: true,
    trim: true,
  },
  countryOfBirth: {
    type: String,
    // required: true,
    trim: true,
  },
  stateOfBirth: {
    type: String,
    // required: true,
    trim: true,
  },
  cityOfBirth: {
    type: String,
    // required: true,
    trim: true,
  },
  dateOfDeath: {
    type: Date,
    // required: true,
    trim: true,
  },
  countryOfDeath: {
    type: String,
    // required: true,
    trim: true,
  },
  stateOfDeath: {
    type: String,
    // required: true,
    trim: true,
  },
  cityOfDeath: {
    type: String,
    // required: true,
    trim: true,
  },
  specialDesignation: {
    type: String,
    // required: true,
    trim: true,
  },
  webAddress: {
    type: String,
    // required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
  },
  about: {
    type: String,
    // required: true,
  },
  biography: {
    type: String,
    // required: true,
  },
  photos: [photoSchema],
  tributes: [tributeSchema],
  createdAt: {
    type: String,
    default: () => moment().format('Do MMMM YYYY'),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Memorial = mongoose.model('Memorial', memorialSchema);

module.exports = Memorial;
