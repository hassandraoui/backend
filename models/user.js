const mongoose = require("mongoose")
const emploiSchema = require("./emploiSchema")
const exempleEmploi = require("./exempleEmploi")

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
    password:String,
	permanent: Boolean,
	masseHoraireDRH: Number,
	masseHoraireAffectee: Number,
	masseHoraireRealiseeCalc: Number,
	emploi:{
		type:emploiSchema,
		default:exempleEmploi
	},
	modules: [
		{
					groupe: {
						type:mongoose.Schema.Types.ObjectId,
						ref:"Groupe"
					},
					module:{
						type:mongoose.Schema.Types.ObjectId,
						ref:"Module"
					}
		}
	],

})
module.exports = mongoose.model("User", userSchema)