const express = require("express");
const { Hotel } = require("../../models/hotelsmodel/hotel");
const { Room } = require("../../models/hotelsmodel/room");

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
module.exports.createHotel = createHotel;

const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    next(err);
  }
};
module.exports.updateHotel = updateHotel;

const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotelId = req.params.id;
    const roomsToDelete = await Room.find({ hotelId: deletedHotelId });
    await Hotel.findByIdAndDelete(deletedHotelId);
    await Room.deleteMany({ hotelId: deletedHotelId });
    res.status(200).json("Hotel and its rooms have been deleted");
  } catch (err) {
    next(err);
  }
};

module.exports.deleteHotel = deleteHotel;


const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
module.exports.getHotel = getHotel;

const getAllHotel = async (req, res, next) => {
  const {min,max,...others}= req.query;
  try {
    const hotels = await Hotel.find({...others, cheapestPrice:{$gt:min ||1 , $lt: max || Number.MAX_SAFE_INTEGER}}).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
module.exports.getAllHotel = getAllHotel;

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
module.exports.countByCity = countByCity;

const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ]);
  } catch (err) {
    next(err);
  }
};
module.exports.countByType = countByType;

const getHotelRooms = async (req,res,next)=> {
try{
const hotel = await Hotel.findById(req.params.id)
const list = await Promise.all(hotel.rooms.map(room => {
  return Room.findById(room);
}));
res.status(200).json(list);
}catch(err){
  next(err);
}
}
module.exports.getHotelRooms = getHotelRooms;