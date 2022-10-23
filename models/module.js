const mongoose = require("mongoose")
const moduleSchema = require("./moduleSchema")



module.exports = mongoose.model("Module", moduleSchema)