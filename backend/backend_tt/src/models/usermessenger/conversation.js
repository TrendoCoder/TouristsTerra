var mongoose = require("mongoose");
const {Schema} = mongoose;
const ConversationSchema = new mongoose.Schema({
    members:{
        type:Array,
    },
    
},
{timestamps:true});
var Conversation =  mongoose.model("Conversation", ConversationSchema);
module.exports.Conversation = Conversation;
