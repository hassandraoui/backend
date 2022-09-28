const express = require("express")
const {createUser,loginUser,refreshToken} = require("../controllers/authorization/authController")
const {authByToken,authByRole} = require("../middlewares/authMiddlewares")

const router = express.Router()

router.get("/", (req, res) => {
	res.send("Authentification")
})

router.post("/createUser", createUser )
router.post("/login", loginUser )
router.get("/refreshToken", refreshToken )
router.get("/private", authByToken, authByRole('ADMIN'), (req , res) => {
    res.status(200).send("<h1>Espace privé</h1>")
   }
)

module.exports = router