const mongoose = require('mongoose');
const md5 = require('../utils/md5');
const commonAttr = require('./common.js');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	...commonAttr,
	email:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true,
		select:false,
		set:val => md5(val)
	},
	bio:{
		type:String,
		default:null
	},
	image:{
		type:String,
		default:null
	}
})

module.exports = userSchema;