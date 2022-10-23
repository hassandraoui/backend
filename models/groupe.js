const mongoose = require("mongoose")
const emploiSchema = require("./emploiSchema")
const exempleEmploi = require("./exempleEmploi")
const moduleSchema = require("./moduleSchema")
//const { moduleSchema } = require("./moduleSchema")

const groupeSchema = new mongoose.Schema({

	designation: String,
	filiereId: {
		type:mongoose.Schema.Types.ObjectId,
		ref: "Filiere"
	},
    stagiaires: [mongoose.SchemaTypes.ObjectId],
	mods:[moduleSchema],
	emploi:{
		type:emploiSchema,
		default:exempleEmploi
	},
})
module.exports = mongoose.model("Groupe", groupeSchema)