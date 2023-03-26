const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./data.json");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/api/search/name-and-description", (req, res) => {
  const { queries } = req.body;

  const results = data.filter((org) =>
    queries.some(
      (query) =>
        org.name.toLowerCase().includes(query.toLowerCase()) ||
        org.description.toLowerCase().includes(query.toLowerCase())
    )
  );

  res.json(results);
});

app.post("/api/search/tags", (req, res) => {
  const { queries } = req.body;

  const results = data.filter((org) =>
    queries.some(
      (query) =>
        org.final_tags.includes(query)
    )
  );

  res.json(results);
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
