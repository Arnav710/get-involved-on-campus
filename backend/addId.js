const fs = require("fs");

// Load the JSON file
const data = require("./data.json");

// Add an id field to each object
let id = 1;
data.forEach((obj) => {
  obj.id = id;
  id++;
  org.upvote_count = 0;
});

// Save the updated data back to the file
fs.writeFileSync("./data.json", JSON.stringify(data));