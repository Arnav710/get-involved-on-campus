const mongoose = require('mongoose');

const Upvote = new mongooge.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

module.exports = mongoose.model('Upvote', Upvote);