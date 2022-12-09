const { response } = require("express");
const { User } = require("../models/index");
const { generateJSW } = require("../helpers/generate-jwt");

const userById = async (req, res = response) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const userBySearch = async (req, res = response) => {
  try {
    const text = req.params.text;
    const data = await User.find({
      $or: [
        { userName: new RegExp(text, 'i') },
        { fullName: new RegExp(text, 'i') },
      ]
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const update = async (req, res = response) => {
  try {
    const id = req.params.id;
    req.body.complete = true;
    const user = await User.findOneAndUpdate({ _id: id }, req.body);
    const token = await generateJSW(user._id, user.complete);
    return res.status(200).json({
      message: "Actualización exitosa",
      user: user,
      token
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

module.exports = {
  userById,
  userBySearch,
  update
};
