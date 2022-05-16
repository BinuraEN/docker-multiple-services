const keys = require("./keys");

//express app setup
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//mysql2 client setup
const db = require("./database");

db.execute("CREATE TABLE IF NOT EXISTS numbers (number INT)")
  .then((result) => console.log("Table created successfully"))
  .catch((e) => console.log("Error while creating table: " + e));

//redis setup
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate();
//duplicating inroder to listen is original is publishing. vice versa

//express route handlers
app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/values/all", async (req, res) => {
  const [rows, fields] = await db.query("SELECT * FROM numbers");
  res.send(rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    res.status(422).send("Index too high");
  }

  redisClient.hset("values", index, "Nothing yet");
  redisPublisher.publish("insert", index);
  db.execute("INSERT INTO numbers (number) VALUES (?)", [index]);

  res.send({ working: true });
});

app.listen(5000, (err) => {
  console.log("express server listening on port 5000");
});
