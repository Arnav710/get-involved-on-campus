const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const data = require("./data.json");
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Configure IBM Watson NLU
const nlu = new NaturalLanguageUnderstandingV1({
  authenticator: new IamAuthenticator({ apikey: 'YOUR_API_KEY' }),
  version: '2022-03-25',
  serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com',
});

app.post("/api/search", async (req, res) => {
  const { queries } = req.body;

  // Extract relevant entities using IBM Watson NLU
  const entities = await nlu.analyze({
    text: queries.join(' '),
    features: { entities: {} }
  }).then(response => {
    return response.result.entities.map(entity => entity.text.toLowerCase());
  }).catch(error => {
    console.log(error);
    return [];
  });

  // Filter organizations based on search queries and relevant entities
  const results = data.filter((org) =>
    queries.some(
      (query) =>
        org.name.toLowerCase().includes(query.toLowerCase()) ||
        org.description.toLowerCase().includes(query.toLowerCase())
    ) ||
    entities.some(
      (entity) =>
        org.name.toLowerCase().includes(entity) ||
        org.description.toLowerCase().includes(entity)
    )
  );

  res.json(results);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
