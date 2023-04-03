const Upvote = require('../models/Upvote');
const User = require('../models/User');
const Organization = require('../models/Organization');

exports.upvoteOrganization = async (req, res) => {
    const { postId } = req.body;
    const { userId } = req.body;
  
    try {
        // Making appropriate changes to the upvote schema
      const upvote = await Upvote.findOne({ postId });
      if (upvote && upvote.upvotedBy.includes(userId)) {
        return res.status(400).json({ message: 'Post already upvoted by user' });
      }
      else if (upvote) {
        upvote.upvotedBy.push(userId);
        await upvote.save();
      } else {
        const newUpvote = new Upvote({ postId, upvotedBy: [userId] });
        await newUpvote.save();
      }
  
      let newUpvote = false;

      // Making appropriate changes to the User schema
      const user = await User.findById(userId);
      if (!user.upvotedOrganizations.includes(postId)) {
        user.upvotedOrganizations.push(postId);
        newUpvote = true;
        await user.save();
      }
  
      // incremenet the upvote_conunt of the organization
      if (newUpvote){
        const organization = await Organization.findById(postId);
        organization.upvote_count++;
        await organization.save();
      }
  
      return res.status(200).json({ message: 'Post upvoted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };