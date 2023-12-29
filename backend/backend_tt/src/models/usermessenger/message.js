var mongoose = require("mongoose");
const {Schema} = mongoose;

const MessageSchema = new mongoose.Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    },
},
{timestamps:true});

var Message =  mongoose.model("Message", MessageSchema);

module.exports.Message = Message;
