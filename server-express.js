const express = require("express")
require("dotenv").config()
const cors = require('cors');

const routesUser = require("./routes/routesUser")
const routesAuth = require("./routes/routesAuth")
const routesModule = require("./routes/routesModule")
const routesGroupe = require("./routes/routesGroupe")
const routesFiliere = require("./routes/routesFiliere")
const routesSalle = require("./routes/routesSalle")
const routesEmploi = require("./routes/routesEmploi")
const {authByToken,authByRole} = require("./middlewares/authMiddlewares")


const mongoose = require("mongoose")
mongoose.connect(`${process.env.MONGO_URI}/cpi_db`, 
	() => console.log("MONGODB (global) connecté"),
	(e) => console.log(e.message)
)

const app = express()
app.use(cors());
app.use(express.json())

app.get("/", (req,res) => { res.send("Liste des groupes de l'ISGI") })


app.use("/auth", routesAuth)
//app.use("/users", authByToken, authByRole('ADMIN'),routesUser)
app.use("/users", routesUser)
app.use("/filieres", routesFiliere)
app.use("/modules", routesModule)
app.use("/groupes", routesGroupe)
app.use("/salles", routesSalle)
app.use("/emplois", routesEmploi)

app.listen(3000,() => console.log('écoutant sur le port 3000'))
