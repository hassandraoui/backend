const mongoose = require("mongoose")
const Stagiaire = require("./models/stagiaire")

mongoose.connect("mongodb://localhost/stagiaires_db", 
	() => console.log("MONGODB connecté"),
	(e) => console.log(e.message)
)

const stagiaire = new Stagiaire({
	nom: "draoui",
	prenom: "hassan",
	dateNaissance: "1984-08-18",
	email: "hassandraoui@gmail.com"
})

stagiaire.save().then( () => console.log("Stagiaire OK") )