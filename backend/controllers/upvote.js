const Upvote = require('../models/Upvote')
const User = require('../models/User')
const Organization = require('../models/Organization')

exports.upvoteOrganization = async (req, res) => {
  const { username, organization_name } = req.body;

  try {
    const upvote = await Upvote.findOne({ organization_name });

    if (upvote && upvote.upvotedBy.includes(username)) {
      // If the upvote exists and the user has already upvoted, remove the upvote

      upvote.upvotedBy = upvote.upvotedBy.filter((name) => name !== username);
      await upvote.save();

      const user = await User.findOne({ username });
      if (user) {
        user.upvotedOrganizations = user.upvotedOrganizations.filter(
          (name) => name !== organization_name
        );
        await user.save();
      }

      const organization = await Organization.findOne({ name: organization_name });
      if (organization) {
        organization.upvote_count--;
        await organization.save();
        return res.status(200).json(organization);
      }
    } else {
      // If the upvote doesn't exist or the user hasn't upvoted, add the upvote

      if (upvote) {
        upvote.upvotedBy.push(username);
        await upvote.save();
      } else {
        const newUpvote = new Upvote({ organization_name, upvotedBy: [username] });
        await newUpvote.save();
      }

      const user = await User.findOne({ username });
      if (user && !user.upvotedOrganizations.includes(organization_name)) {
        user.upvotedOrganizations.push(organization_name);
        await user.save();
      }

      const organization = await Organization.findOne({ name: organization_name });
      if (organization) {
        organization.upvote_count++;
        await organization.save();
        return res.status(200).json(organization);
      }
    }

    return res.status(404).json({ message: 'Organization not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
