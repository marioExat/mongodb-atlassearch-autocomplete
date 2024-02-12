const { MongoClient } = require("mongodb");
const Express = require("express");
require("dotenv").config();
const Cors = require("cors");
const BodyParser = require("body-parser");
const port = process.env.PORT || 3002;

const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));
server.use(Cors());
const mongoURL = process.env.DATABASE_URL;
const mongoDBName = process.env.DATABASE_NAME;
const mongoCollectionName = process.env.COLLECTION_NAME;
const client = new MongoClient(mongoURL);
const spawn = require("child_process").spawn;

server.get("/search", async (req, res) => {
  try {
    console.log(req.query.term);
    let result = await collection
      .aggregate([
        {
          $search: {
            index: "default",
            text: {
              query: req.query.term,
              path: {
                wildcard: "*",
              },
              fuzzy: {
                //maxEdits: 2,
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
        {
          $limi: 10,
        },
      ])
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
server.listen(port, async () => {
  try {
    await client.connect();
    collection = client.db(mongoDBName).collection(mongoCollectionName);
    console.log(`Successfully running on port: ${port}`);
    spawn("open", [`http://localhost:${port}/search?term=avvalakki`]);
  } catch (err) {
    console.log(err);
  }
});
