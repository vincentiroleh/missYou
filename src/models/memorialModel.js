const mongoose = require('mongoose');

const memorialSchema = mongoose.schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  relationship: {
    type: String,
    required: true,
    trim: true,
  },
  dayOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  monthOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  yearOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  countryOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  stateOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  cityOfBirth: {
    type: String,
    required: true,
    trim: true,
  },
  dayOfDeath: {
    type: String,
    required: true,
    trim: true,
  },
  monthOfDeath: {
    type: String,
    required: true,
    trim: true,
  },
  yearOfDeath: {
    type: String,
    required: true,
    trim: true,
  },
  countryOfDeath: {
    type: String,
    required: true,
    trim: true,
  },
  stateOfDeath: {
    type: String,
    required: true,
    trim: true,
  },
  cityOfDeath: {
    type: String,
    required: true,
    trim: true,
  },
  specialDesignation: {
    type: String,
    required: true,
    trim: true,
  },
  webAddress: {
    type: String,
    required: true,
    trim: true,
  },
});

const Memorial = mongoose.model('Memorial', memorialSchema);

module.exports = Memorial;
