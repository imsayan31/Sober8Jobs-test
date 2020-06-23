const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  first_name: { type: String, required: true},
  last_name: { type: String, required: true},
  role: { type: String, required: true},
  address1: { type: String, required: true},
  address2: { type: String},
  state: { type: String, required: true},
  city: { type: String, required: true},
  country: { type: String, required: true},
  zipcode: { type: String, required: true},
  phone: { type: String, required: true, unique: true},
  fax: { type: String},
  hear_about: { type: String, required: true},
  isDeleted: { type: Boolean, default: false},
  createdDtm: { type: Date, default: Date.now},
  updatedDtm: { type: Date, default: Date.now}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
