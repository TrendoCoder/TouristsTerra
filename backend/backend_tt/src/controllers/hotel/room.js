const express = require("express");
const { Room } = require("../../models/hotelsmodel/room");
const { Hotel } = require("../../models/hotelsmodel/hotel");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};
module.exports.createRoom = createRoom;

const updateRoom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (err) {
    next(err);
  }
};
module.exports.updateRoom = updateRoom;

const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne({"roomNumber._id":req.params.id},{
      $push:{
        "roomNumber.$.unavailableDates": req.body.dates
      },
    });
    res.status(200).json("Room status has been Updated");
  } catch (err) {
    next(err);
  }
};
module.exports.updateRoomAvailability = updateRoomAvailability;

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    next(err);
  }
};
module.exports.deleteRoom = deleteRoom;

const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
module.exports.getRoom = getRoom;

const getAllRoom = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
module.exports.getAllRoom = getAllRoom;
