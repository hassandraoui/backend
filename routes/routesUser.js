const express = require("express")
const router = express.Router()

router.get("/" ,(req, res) => {
	res.send("Liste des utilisateurs")
})

router
.route("/:id")
.get( (req,res) => {
	res.send(`Afficher les informations de l'utilisateur dont l'ID est ${req.params.id}`)
})
.post( (req,res) => {
	res.send(`Remplir les informations de l'utilisateur dont l'ID est ${req.params.id}`)
})
.patch( (req,res) => {
	res.send(`Modifier les informations de l'utilisateur dont l'ID est ${req.params.id}`)
})
.delete( (req,res) => {
	res.send(`Supprimer le utilisateur dont l'ID est ${req.params.id}`)
})

module.exports = router