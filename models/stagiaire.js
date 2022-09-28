const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
	ville: String,
	resteAdresse: String

})
const stagiaireSchema = new mongoose.Schema({
	nom: String,
	prenom: String,
	dateNaissance: Date,
	adresse: addressSchema,
	email: {
		type: String,
		minLength:5,
		required: true,
		lowercase:true
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	noteBac: {
		type: Number,
		min: 10,
		max:20
	},
	notesModules: [Number],// A modifier
	//groupe: mongoose.SchemaType.ObjectId

})
module.exports = mongoose.model("Stagiaire", stagiaireSchema)