const express = require("express")
const router = express.Router()
const {createModule,updateModule, deleteModule, getModule, getAllModule, findModulesByFiliereId} = require("../controllers/module/moduleController");


router.get("/" ,(req, res) => {
	getAllModule(req, res);
})

router.post( "/createModule", (req,res) => {
	createModule(req,res);
})


router.get("/findModulesByFiliereId/:id" ,(req, res) => {
	findModulesByFiliereId(req, res);
})

router
.route("/:id")
.get( (req,res) => {
	getModule(req,res);
})

.patch( (req,res) => {
	updateModule(req,res);
})
.delete( (req,res) => {
	deleteModule(req,res);
})

module.exports = router