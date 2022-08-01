const express = require("express");
const NodeCache = require("node-cache");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const cache = new NodeCache({ stdTTL: 100 });

app.get("/todos", (req, res) => {
  const todos = cache.get("todos");
  if (!todos) return res.status(200).json([]);
  return res.status(200).json(todos);
});

app.post("/todos", (req, res) => {
  if (!req.body.title || !req.body.description)
    return res.status(400).json({ message: "bad request" });
  let todos = cache.get("todos");
  if (!todos) todos = [];
  cache.set("todos", [
    ...todos,
    { title: req.body.title, description: req.body.description },
  ]);
  return res.status(200).json({ success: true });
});

app.listen(3000, () => {
  console.log("runing at 3000");
});
