const Organization = require("../models/Organization");

module.exports = {
  getOrganizations: async (req, res) => {
    try {
      const organizations = await Organization.find();
      res.json(organizations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  searchByNameAndDescription: async (req, res) => {
    const { queries } = req.body;
  
    // Join the queries with '|' to create a regular expression
    const regex = new RegExp(queries.join('|'), 'i');
  
    try {
      const organizations = await Organization.find({
        $or: [
          { name: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      });
  
      console.log(`Found ${organizations.length} organizations`);
  
      res.json(organizations);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  },  
  
  searchByTags: async (req, res) => {
    const { queries } = req.body;

    try {
      const organizations = await Organization.find({
        final_tags: { $in: queries },
      });
      res.json(organizations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  upvoteOrganization: async (req, res) => {
    const { id } = req.params;

    try {
      const organization = await Organization.findOneAndUpdate(
        { id },
        { $inc: { upvote_count: 1 } },
        { new: true }
      );

      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
      } else {
        res.json(organization);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
