const jwt = require("jsonwebtoken")
const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const {authByToken} = require("../../middlewares/authMiddlewares")

function generateAccessToken (user)  {
	return accessToken = jwt.sign( user , process.env.ACCESS_TOKEN,{expiresIn:"1d"} )
}
function generateRefreshToken (user)  {
	return refreshToken = jwt.sign( user , process.env.REFRESH_TOKEN,{expiresIn:"1w"} )
}
async function createUser(req,res){
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
        user1.save().then( (user1)=> {
            return res.status(201).json({message:"Utilisateur ajouté!"})
            }).catch((err)=>{
                console.log("Probleme de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}
async function researchUserByMatricule(mat)  {
    try {
        return await User.findOne({matricule:mat}) 
    } catch (error) {
        console.log("probleme mongo : "+error);
    }
}
async function verifyPassword(bdPass,sentPass){
    return await bcrypt.compare(bdPass,sentPass)
}
async function loginUser (req,res){
    if(!req.body.user) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try{
        researchUserByMatricule(req.body.user.matricule).then((user)=> {
            if(!user) {
                return res.status(401).json({message:"Utilisateur non valide"})
            }
            if(req.body.user.matricule !== user.matricule) {
                return res.status(401).json({message:"matricule/MdP non valides"})
            }
        verifyPassword(req.body.user.password,user.password).then((passValid)=> {
            if(!passValid) {
                return res.status(402).json({message:"matricule/MdP non valides"}) 
            }else{
                const {  _id,nom,prenom,matricule,email,role,__v} = user
                const userM = {  _id,nom,prenom,matricule,email,role,__v}
                console.log(userM)
                const accessToken = generateAccessToken(userM)
                const refreshToken = generateRefreshToken(userM)
                return res.status(201).json({
                    accessToken,
                    refreshToken
                    })
            }
            }).catch((err)=>{
                //console.log(err)
                return res.status(401).json({message:"catch 2"})
            })
        })   
    } catch (err) {
        //console.log(err.message)
        return res.status(401).json({message:"catch 1"})
    }

}
async function refreshToken(req,res){
    try {
        const RT = req.headers['authorization'].split(' ')[1]
        if(!RT){
            return res.status(401).json({message:"il faut un refreshToken"})
        }
    jwt.verify(RT,process.env.REFRESH_TOKEN,(err,user)=> {
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
    }
    catch {
            return res.status(401).json({message:"err : problème non identifié"})
        }
    }

module.exports = {
    refreshToken,
    createUser,
    loginUser
}