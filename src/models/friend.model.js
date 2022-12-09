const { Schema, model } = require("mongoose");

const friendSchema = new Schema({
  user_1: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El usuario es obligatorio"],
  },
  user_2: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El usuario es obligatorio"],
  },
  status: {
    type: String,
    enum: ['accepted', 'pending', 'decline'],
    default: 'pending'
  },
  messages: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario es obligatorio"],
      },

      message: {
        type: String,
        required: [false, "El mensaje es obligatorio"],
      },

      multimedia: [
        {
          type: {
            type: String,
            required: [true, "El tipo es obligatoria"],
          },
          base64: {
            type: String,
            required: [true, "El contenido es obligatoria"],
          },
        },
      ],

      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Friend", friendSchema);
