var mongoose = require("mongoose");
const {Schema} = mongoose;
const HotelSchema = new mongoose.Schema({
    userId:{
        type:String,  
    },
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    contact:{
        type: String,
        required:true
    },
    title:{
        type: String,
        required:true
    },
    photos:{
        type: [String],
    },
    hotelDescription:{
        type: String,
        required:true
    },
    rooms:{
        type: [String],
    },
    cheapestPrice:{
        type: Number,
        required:true
    },
    featured:{ 
        type: Boolean,
        default:false
    },
},
{ timestamps: true });

var Hotel =  mongoose.model("Hotel", HotelSchema);

module.exports.Hotel = Hotel;
