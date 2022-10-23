const express = require("express")
const router = express.Router()
const {createGroupe,updateGroupe, deleteGroupe, getGroupe, getAllGroupe, addModuleToGroupe,declareAffectationModuleOfGroupe, declareNonAffectationModuleOfGroupe, removeModuleFromGroupe, ChangeEmploi} = require("../controllers/groupe/groupeController");


router.get("/" ,(req, res) => {
	getAllGroupe(req, res);
})

router.post( "/createGroupe", (req,res) => {
	createGroupe(req,res);
})
router.post( "/ChangeEmploi/:id", (req,res) => {
	ChangeEmploi(req,res);
})

router.patch( "/addModuleToGroupe", (req,res) => {
    addModuleToGroupe(req,res);
})

router.patch( "/removeModuleFromGroupe", (req,res) => {
    removeModuleFromGroupe(req,res);
})

router.patch( "/declareAffectationModuleOfGroupe", (req,res) => {
    declareAffectationModuleOfGroupe(req,res);
})

router.patch( "/declareNonAffectationModuleOfGroupe", (req,res) => {
    declareNonAffectationModuleOfGroupe(req,res);
})


router
.route("/:id")
.get( (req,res) => {
	getGroupe(req,res);
})

.patch( (req,res) => {
	updateGroupe(req,res);
})
.delete( (req,res) => {
	deleteGroupe(req,res);
})

module.exports = router