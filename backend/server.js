const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const organizationsController = require("./controllers/organizations");
const authController = require("./controllers/auth");

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect("mongodb+srv://Arnav:PozWW4Dd1M5EKJem@cluster0.c0tz94h.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 40000, // increase connect timeout to 30 seconds
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database");
});

// authentication routes
app.post("/api/signup", authController.signup);
app.post("/api/login", authController.login);
app.post('/logout', authController.logout);


// middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Invalid token" });
  }
};

// get all organizations
app.get("/api/organizations", organizationsController.getOrganizations);

// searching within the organizations' name and description
app.post( "/api/search/name-and-description", organizationsController.searchByNameAndDescription);

// searching within the organizations' tags
app.post("/api/search/tags", organizationsController.searchByTags);

// upvoting a certain organization by id
app.put("/api/organizations/:id/upvote", verifyToken, organizationsController.upvoteOrganization);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

