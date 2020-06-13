const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const companySchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  company_name: { type: String, required: true, unique: true},
  website: { type: String, required: true},
  logoPath: { type: String},
  description: { type: String},
  isDeleted: { type: Boolean, default: false },
  createdDtm: { type: Date, default: Date.now },
  updatedDtm: { type: Date, default: Date.now }
});

companySchema.plugin(uniqueValidator);
module.exports = mongoose.model('Company', companySchema);
