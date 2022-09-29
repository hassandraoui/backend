const express = require("express")
require("dotenv").config()
const routesStagiaire = require("./routes/routesStagiaire")
const routesUser = require("./routes/routesUser")
const routesAuth = require("./routes/routesAuth")
const {authByToken,authByRole} = require("./middlewares/authMiddlewares")

const mongoose = require("mongoose")
mongoose.connect(`${process.env.MONGO_URI}/cpi_db`, 
	() => console.log("MONGODB (global) connecté"),
	(e) => console.log(e.message)
)

const app = express()

app.use(express.json())

app.get("/", (req,res) => {
res.send("Liste des groupes")
})

app.use("/auth", routesAuth)
app.use("/stagiaires", routesStagiaire)
app.use("/users", authByToken, authByRole('ADMIN'),routesUser)

app.listen(3000,() => console.log('écoutant sur le port 3000'))
