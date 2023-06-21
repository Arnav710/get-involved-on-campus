const User = require('../models/User');

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username);
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
