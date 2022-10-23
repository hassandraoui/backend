const mongoose = require("mongoose")
const emploiSchema = require("./emploiSchema");
const exempleEmploi = require("./exempleEmploi");

const salleSchema = new mongoose.Schema({
    designation: String,
    type: String,
    emploi: {
        type:emploiSchema,
        default:exempleEmploi
    }
});

module.exports = mongoose.model("Salle", salleSchema)