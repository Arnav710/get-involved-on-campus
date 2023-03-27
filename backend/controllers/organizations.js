const Organization = require("../models/Organization");
const jwt = require("jsonwebtoken");

exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find().sort({ upvotes: -1 });
    res.json(organizations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.searchByNameAndDescription = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const organizations = await Organization.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ upvotes: -1 });
    res.json(organizations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.searchByTags = async (req, res) => {
  const { tags } = req.body;
  try {
    const organizations = await Organization.find({ tags: { $in: tags } }).sort(
      { upvotes: -1 }
    );
    res.json(organizations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.upvoteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.findById(id);
    organization.upvotes++;
    await organization.save();
    res.json(organization);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
