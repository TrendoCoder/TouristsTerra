const express = require("express");
const { Conversation } = require("../../models/usermessenger/conversation");

const newConversation = async (req, res, next) => {
    try {
        // Check if conversation already exists for the given members
        const existingConversation = await Conversation.findOne({
            members: {
                $all: [req.body.senderId, req.body.receiverId]
            }
        });
        if (existingConversation) {
            // Conversation already exists
            return res.status(409).json({ message: 'Conversation already exists for these members' });
        }
        // Conversation doesn't exist, create a new one
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        });

        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        next(err);
    }
};
module.exports.newConversation = newConversation;


const getConversation = async (req, res, next) => {
   try{ const conversation = await Conversation.find({
      members:{$in :[req.params.userId]}  
    });
    res.status(200).json(conversation)}
    catch(err){
        next(err)
    }
};
module.exports.getConversation = getConversation;

//get conversation includes two userId
const getConvIncludesTwoUserId = async (req,res,next)=>{
    try{
const conversation = await Conversation.findOne({
    members:{$all :[req.params.firstUserId, req.params.secondUserId]} 
});
res.status(200).json(conversation);
    }catch(err){
next(err);
    }
}
module.exports.getConvIncludesTwoUserId = getConvIncludesTwoUserId;