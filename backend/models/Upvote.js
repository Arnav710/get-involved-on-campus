const mongoose = require('mongoose');

const UpvoteSchema = new mongoose.Schema({
  organization_name: {
    type: String,
    required: true,
  },
  upvotedBy: [{
    type: String,
    required: true,
  }],
});

module.exports = mongoose.model('Upvote', UpvoteSchema);
