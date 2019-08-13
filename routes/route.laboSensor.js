const express = require("express");
const laboModel = require("../models/model.laboSensor");
const app = express();

app.get("/getall", async (req, res) => {
  const labo = await laboModel.find({});
  try {
    res.send(labo);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/insert", async (req, res) => {
  const labo = new laboModel(req.body);
  try {
    await labo.save();
    res.send(labo);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
