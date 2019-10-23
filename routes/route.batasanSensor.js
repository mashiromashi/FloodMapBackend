const express = require("express");
const batasanModel = require("../models/model.batasanSensor");
const app = express();

app.get("/getall", async (req, res) => {
  const batasan = await batasanModel.find({});
  try {
    res.send(batasan);
  } catch (err) {
    res.status(500).send(err);
  }
});

//query for a single latest data entry
app.get("/getlatest", async (req, res) => {
  const batasan = await batasanModel.findOne(
    {},
    {},
    { sort: { createdAt: -1 } }
  );
  try {
    res.send(batasan);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/insert", async (req, res) => {
  const batasan = new batasanModel(req.body);
  try {
    await batasan.save();
    res.status(201).send(batasan);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
