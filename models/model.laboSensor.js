const mongoose = require("mongoose");
const moment = require("moment");

const DateTime = () => moment(new Date()).format("DD-MMM-YYYY_HH:mm:ss");

const laboSchema = new mongoose.Schema({
  waterLevel: {
    type: mongoose.Decimal128
  },
  rainLevel: {
    type: mongoose.Decimal128
  },
  createdAt: {
    type: String,
    default: DateTime,
    index: true,
    text: true
  }
});

const laboSensor = mongoose.model("laboSensor", laboSchema, "Labo");

module.exports = laboSensor;
