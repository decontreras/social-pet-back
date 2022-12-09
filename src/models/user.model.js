const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  dateOfBirth: {
    type: Date
  },
  address: {
    type: String
  },
  business: {
    type: String
  },
  landline: {
    type: String
  },
  profession: {
    type: String
  },
  image: {
    type: String
  },
  maritalStatus: {
    type: String,
    enum: ["soltero", "casado", "divorciado", "viudo", "union libre"]
  },
  typeAccount: {
    type: String,
    enum: ["fundación", "adoptante"],
    default: "adoptante"
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener más de 6 caracteres"]
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: [true, "El correo ya existe en el sistema"],
  },
  userName: {
    type: String,
    required: [true, "El nombre de usuario es obligatorio"],
    unique: [true, "El nombre de usuario ya existe en el sistema"],
  },
  phone: {
    type: String,
    required: [true, "El numero de celular es obligatorio"],
    unique: [true, "El numero de celular ya existe en el sistema"],
  },
  fullName: {
    type: String,
    required: [true, "El nombre completo es obligatorio"]
  },
  complete: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = model("User", userSchema);
