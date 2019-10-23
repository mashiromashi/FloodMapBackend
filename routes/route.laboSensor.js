const express = require("express");
const laboModel = require("../models/model.laboSensor");
const app = express();
const monthArray = require("../util/months");
const moment = require("moment");

app.get("/getall", async (req, res) => {
  const labo = await laboModel.find({});
  try {
    res.send(labo);
  } catch (err) {
    res.status(500).send(err);
  }
});

//query for a single latest data entry
app.get("/getlatest", async (req, res) => {
  const labo = await laboModel.findOne({}, {}, { sort: { createdAt: -1 } });
  try {
    res.send(labo);
  } catch (err) {
    res.status(500).send(err);
  }
});

// //query for monthly statistics
// app.get("/monthly?q=:inputMonth", async (req, res) => {
//   let currentMomentMonth = moment().month();
//   let currentMonth = monthArray[currentMomentMonth];

//   const inputMonth = req.params.input
//   const monthly = await laboModel.find({
//     $text: {
//       $search: inputMonth
//     }
//   });
//   if (monthly) {
//     try {
//       res.status(200).send
//     }
//   }
// });

app.post("/insert", async (req, res) => {
  const labo = new laboModel(req.body);
  try {
    await labo.save();
    res.status(201).send(labo);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
