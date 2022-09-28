const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	nom: String,
	prenom: String,
    matricule: String,
	email: {
		type: String,
		minLength:5,
		required: true,
		lowercase:true
	},
    role:String,
    password:String
})
module.exports = mongoose.model("User", userSchema)