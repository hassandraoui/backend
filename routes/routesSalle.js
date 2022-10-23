const express = require("express")
const router = express.Router()
const {createSalle,updateSalle, deleteSalle, getSalle, getAllSalle, ChangeEmploi} = require("../controllers/salle/salleController");


router.get("/" ,(req, res) => {
	getAllSalle(req, res);
})

router.post( "/createSalle", (req,res) => {
	createSalle(req,res);
})

router.post( "/ChangeEmploi/:id", (req,res) => {
	ChangeEmploi(req,res);
})

router
.route("/:id")
.get( (req,res) => {
	getSalle(req,res);
})

.patch( (req,res) => {
	updateSalle(req,res);
})
.delete( (req,res) => {
	deleteSalle(req,res);
})

module.exports = router