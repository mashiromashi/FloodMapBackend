const mongoose = require("mongoose");
const floodMapSchema = require("../db/schema");

let batasanSensor = mongoose.model("batasanSensor", floodMapSchema, "Batasan");

module.exports = batasanSensor;
