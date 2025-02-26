const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  }
});
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shoes: [shoeSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
