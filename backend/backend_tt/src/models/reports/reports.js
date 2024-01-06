var mongoose = require("mongoose");

const {Schema} = mongoose;

const ReportSchema = new mongoose.Schema({
    reporterId:{
        type:String,
    },
    authorId:{
        type:String,
    },
    type:{
        type:String,
    },
    message:{
        type:String,
    }
},
{ timestamps: true });

var Report =  mongoose.model("Report", ReportSchema);

module.exports.Report = Report;
