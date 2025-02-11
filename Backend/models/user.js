const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  gender: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
