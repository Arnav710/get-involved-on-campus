const mongoose = require('mongoose');

// importing library to hash passwordss
const bcrypt = require('bcryptjs');

// create the mongoose schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hashing the passoword again if the value of the variable password changed
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

// checking if the password entered matched the hashed form
userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

// exporting the mongoose model
const User = mongoose.model('User', userSchema);

module.exports = User;
