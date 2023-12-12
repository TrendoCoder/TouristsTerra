var mongoose = require("mongoose");

const { Schema } = mongoose;

const RoomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
      required: true,
    },
    hotelName:{
      type:String,
      required:true,
    },
    title: {
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    address:{
      type:String,
      required:true,
    },
    roomNumber:{
      type:Number,
      required:true,
    },
    numOfBeds:{
      type:Number,
      required:true,
    },
    numOfAdults:{
      type:Number,
      required:true,
    },
    pricePerNight: {
      type: Number,
      required: true,
    },
    roomDescription: {
      type: String,
      required: true,
    },
    photos:{
      type:Array,
    },
    isWifi:{
      type:Boolean,
      default:false,
    },
    isLaundary:{
      type:Boolean,
      default:false,
    },
    isParking:{
      type:Boolean,
      default:false,
    },
    extraFeatures:{
      type:String,
    },
    furnished:{
      type:Boolean,
      default:true,
    },
    availabilty:{
      type:Boolean,
      default:true,
    }
  },
  {
    timestamps: true,
  }
);

var Room = mongoose.model("Room", RoomSchema);

module.exports.Room = Room;
