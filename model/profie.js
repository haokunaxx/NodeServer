const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let profileSchema = new Schema({
	following:{
		type:Boolean,
		default:false
	},
	username:{
		type:String,
		require:true
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

module.exports = profileSchema;