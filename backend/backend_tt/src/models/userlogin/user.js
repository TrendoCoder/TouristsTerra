var mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        unique:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    isAdmin:{ 
        type: Boolean,
        default:false
    },
}
,
{timestamps:true}
);

var User =  mongoose.model("User", UserSchema);

module.exports.User = User;
