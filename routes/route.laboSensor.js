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
  const labo = await laboModel.findOne({}, {}, { sort: { _id: -1 } });
  try {
    res.send(labo);
  } catch (err) {
    res.status(500).send(err);
  }
});

//query for monthly statistics
app.get("/monthly/q=:inputMonth", async (req, res) => {
  const input = req.params.inputMonth;
  const monthly = await laboModel.find({
    $text: {
      $search: input
    }
  });
  if (monthly) {
    try {
      res.status(200).send(monthly);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

//query for weekly statistics
app.get("/weekly", async (req, res) => {
  const month = monthArray[moment(new Date()).month()];
  const day = moment(new Date()).date();
  const today = `${day}-${month}`;
  const lastWeek = `${day - 7}-${month}`;
  // const today = moment().startOf("day");
  const weekly = await laboModel.find({
    createdAt: {
      $gte: lastWeek,
      $lte: today
    }
  });
  if (weekly) {
    try {
      res.status(200).send(weekly);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});


app.post("/insert", async (req, res) => {
  const labo = new laboModel(req.body);
  try {
    await labo.save();
    res.status(201).send(labo);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get("/current", async(req,res)=>{
  const day = moment(new Date()).date().toString();
  const month = monthArray[moment(new Date()).month()];
  const year = moment(new Date()).year()
  const start = moment(new Date()).set({ hour:0, minute:0, second:0 }).format("HH:mm:ss");
  const end = moment(new Date()).set({ hour:23, minute:59, second:59 }).format("HH:mm:ss");

  const current = await laboModel.find({
    createdAt:{
      $gte: `${day}-${month}-${year}_${start}`,
      $lte: `${day}-${month}-${year}_${end}`
    }
  })
  if (current) {
    try {
      res.status(200).send(current)
    } catch (err) {
      res.status(500).send(err)
    }
  }
})

module.exports = app;
