const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');
const schema = new mongoose.Schema(
	{
		username : {
			//username
			type      : String,
			required  : true,
			unique    : true,
			trim      : true,
			lowercase : true
		},
		password : {
			//password
			type     : String,
			required : true,
			trim     : true
		}
	},
	{
		timestamps : true,
		autoIndex  : false
	}
);
schema.plugin(uniqueValidator);
schema.pre('save', async function(next) {
	this.isModified('password') && (this.password = await bcrypt.hash(this.password, 8));
	next();
});

module.exports = mongoose.model('User', schema);
