const express = require("express")
const router = express.Router()
const {createFiliere,updateFiliere, deleteFiliere, getFiliere, getAllFiliere, addModuleToFiliere, removeModuleFromFiliere} = require("../controllers/filiere/filiereController");


router.get("/" ,(req, res) => {
	getAllFiliere(req, res);
})

router.post( "/createFiliere", (req,res) => {
	createFiliere(req,res);
})

router.patch( "/addModuleToFiliere", (req,res) => {
    addModuleToFiliere(req,res);
})

router.patch( "/removeModuleFromFiliere", (req,res) => {
    removeModuleFromFiliere(req,res);
})

router
.route("/:id")
.get( (req,res) => {
	getFiliere(req,res);
})

.patch( (req,res) => {
	updateFiliere(req,res);
})
.delete( (req,res) => {
	deleteFiliere(req,res);
})

module.exports = router