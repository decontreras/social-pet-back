const { response } = require("express");
const { Friend } = require("../models/index");

const request = async (req, res = response) => {
  try {
    await Friend.create(req.body);
    return res.status(200).json({
      message: "Registro exitoso"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const getByUsers = async (req, res = response) => {
  try {
    const { user_1, user_2 } = req.params;
    const friend = await Friend.findOne({
      $or: [
        {
          $and: [
            { user_1: user_1 },
            { user_2: user_2 }
          ]
        },
        {
          $and: [
            { user_1: user_2 },
            { user_2: user_1 }
          ]
        }
      ],
    });
    return res.status(200).json(friend);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const getRequest = async (req, res = response) => {
  try {
    const id = req.params.id;
    const resquests = await Friend.find({
      $or: [
        { user_1: id },
        { user_2: id }
      ],
      status: 'pending'
    })
    .populate("user_1 user_2");
    return res.status(200).json(resquests);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const acceptRequest = async (req, res = response) => {
  try {
    await Friend.findOneAndUpdate({ _id: req.body.id }, { status: 'accepted' });
    return res.status(200).json({
      message: "Aceptado exitosamente"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const declineRequest = async (req, res = response) => {
  try {
    await Friend.findOneAndUpdate({ _id: req.body.id }, { status: 'decline' });
    return res.status(200).json({
      message: "Declinado exitosamente"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const getFriends = async (req, res = response) => {
  try {
    const id = req.params.id;
    const resquests = await Friend.find({
      $or: [
        { user_1: id },
        { user_2: id }
      ],
      status: 'accepted'
    })
      .populate("user_1 user_2");
    return res.status(200).json(resquests);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const getById = async (req, res = response) => {
  try {
    const id = req.params.id;
    const data = await Friend.findById(id)
      .populate("user_1 user_2");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

module.exports = {
  request,
  getByUsers,
  getRequest,
  acceptRequest,
  declineRequest,
  getFriends,
  getById
};
