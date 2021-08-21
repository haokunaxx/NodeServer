const mongoose = require('mongoose');
const md5 = require('../utils/md5');
const Schema = mongoose.Schema;

let userSchema = new Schema({
	email:{
		type:String,
		require:true
	},
	username:{
		type:String,
		require:true
	},
	password:{
		type:String,
		require:true,
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
	},
	createTime:{
		type:String,
		default:Date.now()
	},
	updateTime:{
		type:String,
		default:Date.now()
	}
})

module.exports = userSchema;