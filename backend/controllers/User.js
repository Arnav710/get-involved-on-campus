const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  upvotedOrganizations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }]
});

module.exports = mongoose.model("User", userSchema);
