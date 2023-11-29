const express = require("express");
const { Message } = require("../../models/usermessenger/message");

const newMessage = async (req, res, next) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    next(err);
  }
};
module.exports.newMessage = newMessage;

const getMessage = async (req, res, next) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (err) {
    next(err);
  }
};
module.exports.getMessage = getMessage;
