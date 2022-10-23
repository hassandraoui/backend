const express = require("express")
const router = express.Router()
const {convrtEmploiToPDF, getEmploiPDF} = require("../controllers/emploi/emploiController");


router.get("/getEmploiPDF" ,(req, res) => {
	getEmploiPDF(req, res);
})

router.post( "/convrtEmploiToPDF", (req,res) => {
	convrtEmploiToPDF(req,res);
})


module.exports = router