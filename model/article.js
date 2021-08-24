const { Schema } = require('mongoose');
const commonAttr = require('./common.js');
const articleSchema = new Schema({
	...commonAttr,
	title:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	body:{
		type:String,
		required:true
	},
	tagList:{
		type:[String],
		// default:null
		required:true
	},
	favoritesCount:{
		type:Number,
		default:0
	},
	author:{
		type:Schema.Types.ObjectId,
		ref:'User',
		required:true
	}
});

module.exports = articleSchema;


