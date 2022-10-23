const mongoose = require("mongoose")

const moduleSchema = new mongoose.Schema({

	designation: String,
    codeModule: String,
	masseHoraireP: Number,
	masseHoraireD: Number,
	filiereId:  mongoose.Schema.Types.ObjectId,
	groupeId:  {
		type: mongoose.Schema.Types.ObjectId,
		default:null
	},
	userId:  {
		type: mongoose.Schema.Types.ObjectId,
		default:null
	},
	regional: Boolean,
	affecte: Boolean
})

//const Module = new mongoose.model("Module", moduleSchema)
module.exports = moduleSchema
