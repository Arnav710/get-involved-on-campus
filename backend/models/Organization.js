const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: String,
  description: String,
  link: String,
  final_tags: [String],
  upvote_count: { type: Number, default: 0 },
});

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
