const { response } = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("../models/index");
const { generateJSW } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Correo incorrecto",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(404).json({
        message: "Contraseña incorrecta",
      });
    }
    const token = await generateJSW(user._id, user.complete);
    await user.save();
    return res.status(200).json({
      message: "Ingreso exitoso",
      user: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error de logueo",
    });
  }
};

const register = async (req, res = response) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const user = await User.create(req.body);
    const token = await generateJSW(user._id, user.complete);
    return res.status(200).json({
      message: "Registro exitoso",
      user: user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error
    });
  }
};

module.exports = {
  login,
  register
};
