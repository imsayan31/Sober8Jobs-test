const mongoose = require('mongoose');

const companyAddressSchema = mongoose.Schema({
	user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	address: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	zipcode: { type: String, required: true },
	country: { type: String, required: true },
	createdDtm: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('CompanyAddress', companyAddressSchema);