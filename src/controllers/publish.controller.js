const { response } = require("express");
const { Publish, User } = require("../models/index");

const newPublish = async (req, res = response) => {
  try {
    await Publish.create(req.body);
    return res.status(200).json({
      message: "Registro exitoso"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const getListPublish = async (req, res = response) => {
  try {
    const listPublish = await Publish.find()
      .populate("userId")
      .populate('comments.user')
      .sort({ createdAt: -1 });
    return res.status(200).json(listPublish);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const getListlistByUser = async (req, res = response) => {
  try {
    const id = req.params.id;
    const listPublish = await Publish.find({ userId: id })
      .populate("userId")
      .sort({ createdAt: -1 });
    return res.status(200).json(listPublish);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const addLike = async (req, res = response) => {
  try {
    const id = req.params.id;
    const publish = await Publish.findById(id).populate("userId");
    if (publish.likes.filter(p => p.user == req.body.user).length == 0) {
      const user = await User.findById(req.body.user);
      const like = {
        user: user
      };
      publish.likes.push(like);
    } else {
      publish.likes = publish.likes.filter(p => p.user != req.body.user);
    }
    let response = await publish.save();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const addComment = async (req, res = response) => {
  try {
    const id = req.params.id;
    const publish = await Publish.findById(id).populate("userId");
    const user = await User.findById(req.body.user);
    const comment = {
      user: user,
      text: req.body.text
    };
    publish.comments.push(comment);
    let response = await publish.save();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const getRequestByUser = async (req, res = response) => {
  try {
    const id = req.params.id;
    const listPublish = await Publish.find({ userId: id, "request.status": 'pending' })
      .populate("userId")
      .populate("request.user")
      .sort({ createdAt: -1 });
    return res.status(200).json(listPublish);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

const addRequest = async (req, res = response) => {
  try {
    const id = req.params.id;
    const publish = await Publish.findById(id).populate("userId");
    const user = await User.findById(req.body.user);
    const request = {
      user: user
    };
    publish.request.push(request);
    let response = await publish.save();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

module.exports = {
  newPublish,
  getListPublish,
  getListlistByUser,
  addLike,
  addRequest,
  addComment,
  getRequestByUser
};
