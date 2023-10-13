const mongoose = require("mongoose");
const Joi = require("joi");
const postSchema = new mongoose.Schema(
    {
        userId:String,
        desc:String,
        img:String,
        likes:{
            type:Array,
            default:[],
        },

    },
    {
        timestamps:true
    },

    function validatePost(data){
        const schema = Joi.object({
            desc: Joi.string().min(0).max(500),
        });
        return schema.validate(data,{abortEarly: false});
    }
);

module.exports = mongoose.model("Posts",postSchema);
module.exports.validatePost = this.validatePost;