const mongoose = require("mongoose")

const emploiSchema = require("./emploiSchema")
module.exports = mongoose.model("Emploi", emploiSchema)