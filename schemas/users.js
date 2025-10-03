const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
  },
  role: { type: String, enum: ["admin", "user"], default: "admin" },
});

const User = mongoose.model("User", userSchema);

const findUserById = (id, callback) => {
  User.findOne({ id })
    .then((result) => {
      console.log("🔍 Encontrado:", result);
      return callback(null, result);
    })
    .catch((err) => {
      console.error(err);
      console.log("🔍 Error:", err);
      return callback(err);
    });
};

const findUserByApiKey = (apiKey, callback) => {
  User.findOne({ apiKey })
    .then((result) => {
      console.log("🔍 Encontrado:", result);
      return callback(null, result);
    })
    .catch((err) => {
      console.error(err);
      console.log("🔍 Error:", err);
      return callback(err);
    });
};

const findUserByEmail = (email, callback) => {
  User.findOne({ email })
    .then((result) => {
      console.log("🔍 Encontrado:", result);
      return callback(null, result);
    })
    .catch((err) => {
      console.error(err);
      console.log("🔍 Error:", err);
      return callback(err);
    });
};

module.exports = {
  User,
  findUserById,
  findUserByApiKey,
  findUserByEmail,
};
