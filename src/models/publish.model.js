const { Schema, model } = require("mongoose");

const publishSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "El usuario es obligatorio"],
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
  text: {
    type: String
  },
  type: {
    type: String,
    enum: ['busqueda de hogar', 'busqueda de colecta', 'busqueda de ayuda'],
    default: 'busqueda de hogar'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario es obligatorio"],
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario es obligatorio"],
      },
      text: {
        type: String,
        required: [true, "El texto es obligatorio"],
      },
      date: {
        type: Date,
        default: new Date
      }
    }
  ],
  request: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "El usuario es obligatorio"],
      },
      status: {
        type: String,
        enum: ['view', 'pending'],
        default: 'pending'
      }
    }
  ]
});

module.exports = model("Publish", publishSchema);
