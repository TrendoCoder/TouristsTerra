var mongoose = require("mongoose");

const {Schema} = mongoose;

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    newPeople:{
        type: Number,
        required:true
    },
    roomDescription:{
        type: String,
        required:true
    },
    roomNumber:[{
        number:Number,
        unavailableDates: {type:[Date]}
    }]
},
{
    timestamps:true
}
);

var Room =  mongoose.model("Room", RoomSchema);

module.exports.Room = Room;
