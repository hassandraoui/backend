const jwt = require("jsonwebtoken")
const User = require("./models/user")
const bcrypt = require("bcryptjs")
const express = require("express")
const app = express()


const mongoose = require("mongoose")
mongoose.connect(`${process.env.MONGO_URI}/users_db`, 
	() => console.log("MONGODB connecté"),
	(e) => console.log(e.message)
)
function generateAccessToken (user)  {
	return accessToken = jwt.sign( user , process.env.ACCESS_TOKEN,{expiresIn:"1d"} )
}
function generateRefreshToken (user)  {
	return refreshToken = jwt.sign( user , process.env.REFRESH_TOKEN,{expiresIn:"1w"} )
}
function authRole(role){
    return (req,res,next) => {
        try {
            const AT = req.headers['authorization'].split(' ')[1]
            jwt.verify(AT,ACCESS_TOKEN, (err,user)=> {
                if(err){
                    console.log("err")
                    return res.status(401).json({message:"err : il faut s'authentifier, accessToken non valide"})
                } 
                else {
                    if(user.role!==role){
                        return res.setStatus(401)
                    }
                    next()
                }
            })
        }
        catch {
            return res.status(401).json({message:"err : vérifier que vous étes admin"})
        }

    }
}
app.use(express.json())

function authByToken(req,res,next){
    console.log(req.headers['authorization'])
    const AT = req.headers['authorization'].split(' ')[1]
    if(!AT){
        return res.status(401).json({message:"il faut s'authentifier"})
    }
    try{
        jwt.verify(AT,ACCESS_TOKEN,(err,user)=> {
            if(err){
                return res.status(401).json({message:"err : il faut s'authentifier, accessToken non valide"})
            }
            //res.status(200).json({user})
            next()
        })
    }catch {
        res.status(401).json({message:"err : problème non identifié"})
    }
}

app.get("/private", authByToken, authRole('ADMIN'), (req , res) => {
 res.status(200).send("<h1>Espace privé</h1>")
}
)

app.post("/createUser", async (req,res) => {
    if(!req.body.user) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const passCrypt = await bcrypt.hash(req.body.user.password,10)
        const user1 = new User({
            nom: req.body.user.nom,
            prenom: req.body.user.prenom,
            matricule: req.body.user.matricule,
            email: req.body.user.email,
            role:req.body.user.role || 'USER',
            password:passCrypt
        })
        user1.save().then(()=> console.log('Utilisateur ajouté!'))
        res.json(user1)
    } catch (err) {
        console.log(err.message)
    }
    
})
async function researchUserParMatricule(mat)  {
    return await User.findOne({matricule:mat}) 
    //const user = await User.findById("62fa3c083de499e4fbd83f51")
}
async function verifyPassword(bdPass,sentPass){
    return await bcrypt.compare(bdPass,sentPass)
}
app.post("/login", async (req,res) => {
    if(!req.body.user) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try{
        researchUserParMatricule(req.body.user.matricule).then((user)=> {
            if(!user) {
                return res.status(401).json({message:"Utilisateur non valide"})
            }
            if(req.body.user.matricule !== user.matricule) {
                return res.status(401).json({message:"matricule/MdP non valides"})
            }
        verifyPassword(req.body.user.password,user.password).then((passValid)=> {
            console.log(passValid)
            if(!passValid) {
                return res.status(402).json({message:"matricule/MdP non valides"}) 
            }else{
                const {  _id,nom,prenom,matricule,email,role,__v} = user
                const userM = {  _id,nom,prenom,matricule,email,role,__v}
                console.log(userM)
                const accessToken = generateAccessToken(userM)
                const refreshToken = generateRefreshToken(userM)
                res.status(201).json({
                    accessToken,
                    refreshToken
                    })
            }
            }).catch((err)=>{
                console.log(err)
                return
            })
        })   
    } catch (err) {
        console.log(err.message)
    }

})
app.get("/refreshToken", (req,res) => {
const RT = req.headers['authorization'].split(' ')[1]

if(!RT){
    return res.status(401).json({message:"il faut un refreshToken"})
}
try{
    jwt.verify(RT,REFRESH_TOKEN,(err,user)=> {
        if(err){
            return res.status(401).json({message:"err : il faut s'authentifier, refreshToken non valide"})
        }
        delete user.iat
        delete user.exp
        const newAccessToken = generateAccessToken(user)
        return res.status(201).json({
            accessToken:newAccessToken
            })
    })
}catch {
    res.status(401).json({message:"err : problème non identifié"})
}


})
app.listen(3000)