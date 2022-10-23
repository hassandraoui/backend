const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const {createUser,updateUser, deleteUser, getUser, getAllUser, addModuleToUser, removeModuleFromUser, ChangeEmploi} = require("../controllers/authorization/userController");


router.get("/" ,(req, res) => {
	getAllUser(req, res);
})

router.post( "/createUser", (req,res) => {
	createUser(req,res);
})

router.post( "/ChangeEmploi/:id", (req,res) => {
	ChangeEmploi(req,res);
})
router.patch("/addModuleToUser", (req, res)=>{
	addModuleToUser(req, res);
})

router.patch("/removeModuleFromUser", (req, res)=>{
	removeModuleFromUser(req, res);
})

router
.route("/:id")
.get( (req,res) => {
	getUser(req,res);
})

.patch( (req,res) => {
	updateUser(req,res);
})
.delete( (req,res) => {
	deleteUser(req,res);
})

module.exports = router