const jwt = require("jsonwebtoken")
function authByToken(req,res,next){
    try {
        const AT = req.headers['authorization'].split(' ')[1]
        if(!AT){
            return res.status(401).json({message:"il faut s'authentifier"})
        }
        try{
            jwt.verify(AT,process.env.ACCESS_TOKEN,(err,user)=> {
                if(err){
                    return res.status(401).json({message:"err : il faut s'authentifier, accessToken non valide"})
                }
                next()
            })
        }catch {
            res.status(401).json({message:"err : problème non identifié dans authByToken"})
        }
    } catch (error) {
       return res.status(401).json({message:"err : il faut envoyer un accessToken"})
    }
}
function authByRole(role){
    return (req,res,next) => {
        try {
            const AT = req.headers['authorization'].split(' ')[1]
            jwt.verify(AT,process.env.ACCESS_TOKEN, (err,user)=> {
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

module.exports = {
    authByToken,
    authByRole
}