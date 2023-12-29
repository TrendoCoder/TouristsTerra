var mongoose = require("mongoose");

const { Schema } = mongoose;

const guideLinesSchema = new mongoose.Schema(
  {
    guidelines:{type:String} 
  },
  { timestamps: true }
);

var Guidelines = mongoose.model("Guidelines", guideLinesSchema);

module.exports.Guidelines = Guidelines;
