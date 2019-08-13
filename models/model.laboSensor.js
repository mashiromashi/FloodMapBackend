const mongoose = require("mongoose");
const floodMapSchema = require("../db/schema");

let laboSensor = mongoose.model("laboSensor", floodMapSchema, "Labo");

module.exports = laboSensor;
