const mongoose = require('mongoose');
const Organization = require('./../models/Organization');
const organizationsData = require('./../data.json');

MONGODB_URI="mongodb+srv://Arnav:PozWW4Dd1M5EKJem@cluster0.c0tz94h.mongodb.net/test"

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  await Organization.deleteMany({});

  const organizations = organizationsData.map(org => ({
    id: org.id,
    name: org.name,
    description: org.description,
    link: org.href,
    final_tags: org.final_tags,
    upvote_count: org.upvote_count
  }));

  await Organization.insertMany(organizations);

  console.log('Organizations inserted');
  mongoose.connection.close();
});
