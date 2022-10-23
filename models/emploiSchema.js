const mongoose = require("mongoose")

const seanceSchema = new mongoose.Schema({
    groupeId: mongoose.Schema.Types.ObjectId,
    salleId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId
    //..........
    /*
    userName: String,
    groupeName: String,
    salleName: String
    */
})
const seancesDuJourSchema = new mongoose.Schema({
    seance1:seanceSchema,
    seance2:seanceSchema,
    seance3:seanceSchema,
    seance4:seanceSchema
})


const emploiSchema = new mongoose.Schema({
    lundi: seancesDuJourSchema,
    mardi: seancesDuJourSchema,
    mercredi: seancesDuJourSchema,
    jeudi: seancesDuJourSchema,
    vendredi: seancesDuJourSchema,
    samedi: seancesDuJourSchema
})

module.exports = emploiSchema