const mongoose = require('mongoose');
require('dotenv').config();

const UserSchema=new mongoose.Schema({
	username:{
		type:String,
		required:true,
		unique:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		lowercase:true,
		validate: {						
			validator: function(v) {
				return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		}
	},
	password:{
		type:String,
		required:true,
		minlength:6,
	},
	createdAt:{
		type:Date,
		default:Date.now
	},
},{timestamps:true,versionKey:false});

const User=mongoose.model('User',UserSchema);
module.exports=User;