const mongoose = require('../config');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  groups: { type: Array },
  amount: { type: Number },
});

const userModel = mongoose.model('user', UserSchema);

module.exports = userModel;
