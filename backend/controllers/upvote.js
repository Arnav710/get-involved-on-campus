const Upvote = require('../models/Upvote');
const User = require('../models/User');
const Organization = require('../models/Organization');

exports.upvoteOrganization = async (req, res) => {
  const { postId } = req.body;
  const { userId } = req.body;

  try {
    const upvote = await Upvote.findOne({ postId });

    if (upvote && upvote.upvotedBy.includes(userId)) {
      // If the upvote exists and the user has already upvoted, remove the upvote

      upvote.upvotedBy = upvote.upvotedBy.filter((id) => id !== userId);
      await upvote.save();

      const user = await User.findById(userId);
      user.upvotedOrganizations = user.upvotedOrganizations.filter(
        (id) => id !== postId
      );
      await user.save();

      const organization = await Organization.findById(postId);
      organization.upvote_count--;
      await organization.save();

      return res.status(200).json({ message: 'Post upvote removed successfully' });
    } else {
      // If the upvote doesn't exist or the user hasn't upvoted, add the upvote

      if (upvote) {
        upvote.upvotedBy.push(userId);
        await upvote.save();
      } else {
        const newUpvote = new Upvote({ postId, upvotedBy: [userId] });
        await newUpvote.save();
      }

      const user = await User.findById(userId);
      if (!user.upvotedOrganizations.includes(postId)) {
        user.upvotedOrganizations.push(postId);
        await user.save();
      }

      const organization = await Organization.findById(postId);
      organization.upvote_count++;
      await organization.save();

      return res.status(200).json({ message: 'Post upvoted successfully' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
