const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const organizationsController = require("./controllers/organizations");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

// get all organizations
app.get("/api/organizations", organizationsController.getOrganizations);

// searching within the organizations' name and description
app.post( "/api/search/name-and-description", organizationsController.searchByNameAndDescription);

// searching within the organizations' tags
app.post("/api/search/tags", organizationsController.searchByTags);

// upvoting a certain organization by id
app.put("/api/organizations/:id/upvote", organizationsController.upvoteOrganization);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
