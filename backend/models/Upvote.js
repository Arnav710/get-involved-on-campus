const mongoose = require('mongoose');

const Upvote = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    upvotedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
});

module.exports = mongoose.model('Upvote', Upvote);
