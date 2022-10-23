const jwt = require("jsonwebtoken")
const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const {authByToken} = require("../../middlewares/authMiddlewares");
const Groupe = require("../../models/groupe");

async function getAllUser(req, res){
    try {
        const users1 = await User.find({})
        .populate(
            {
                path: 'modules',
                populate: {
                    path: 'module',
                    model: 'Module'
                }
            }
        )
        /*.populate(
            {
                path: 'modules',
                populate: {
                    path: 'groupe',
                    model: 'Groupe'
                }
            }
        );*/
        console.log("=================================");
        res.status(201).json(users1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}

async function getUser(req, res){
    try {
        const user1 = await User.findById(req.params.id)
        .populate(
            {
                path: 'modules',
                populate: {
                    path: 'module',
                    model: 'Module'
                }
            }
        );
        console.log("=================================");
        res.status(201).json(user1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}

async function createUser(req,res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        console.log("on essaye de créer user")
        console.log("1 req.body")
        console.log(req.body)
        const passCrypt = await bcrypt.hash(req.body.password,10)
        const MHDRH = parseInt(req.body.masseHoraireDRH)

        const user1 = new User({
            nom: req.body.nom,
            prenom: req.body.prenom,
            matricule: req.body.matricule,
            email: req.body.email,
            role:req.body.role || 'USER',
            masseHoraireDRH: MHDRH,
            permanent: req.body.permanent,
            masseHoraireAffectee: req.body.masseHoraireAffectee || 0,
            masseHoraireRealiseeCalc: req.body.masseHoraireRealiseeCalc || 0,
            password:passCrypt
        })
        console.log("2 user:")
        console.log(user1)

        user1.save().then( (user1)=> {
            res.status(201).json({message:"Utilisateur ajouté!"})
            console.log("-----------------------------------------------------------")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function updateUser(req, res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const user1 = await User.findById(req.params.id);
        console.log(user1)
        Object.assign(user1,req.body);
        //user1.save();
        //const user1 = await Character.findOneAndUpdate({_id:req.body._id}, update});

        //await new User({ ...req.body, password: hashPassword }).save();

        user1.save().then( (user1)=> {
            res.status(201).json({message:"Utilisateur modifié!"})
            console.log("***************************************")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteUser(req, res){
    try {
        const user1 = await User.findByIdAndDelete(req.params.id);
        console.log("+++++++++++++++++++++++++++++++++++++++")
        res.status(201).json(user1)
    } catch (err) {
        console.log("Problème de suppression : "+err)
    }
}

async function addModuleToUser(req, res){

    try {
        const {userId, moduleId, groupeId, masseHoraireP} = req.body;
        console.log("-+req.body")
        console.log(req.body)
        const user1 = await User.findByIdAndUpdate(
            userId,
            {
                $push: 
                     {
                        "modules":
                            {
                                "groupe":groupeId, 
                                "module":moduleId 
                            }
                    }
            }
        );
        //Modification de la masse horaire affectée au formateur
        user1.masseHoraireAffectee = user1.masseHoraireAffectee + masseHoraireP
        user1.save().then( ()=> {
            console.log("user1.masseHoraireAffectee")
            console.log(user1.masseHoraireAffectee)
        }).catch((err)=>{
            console.log("MAJ masseHoraireAffectee échoué"+err)
        })
        //Ajouter le userId au module du groupe (groupeId)
        const groupe1 = await Groupe.updateOne(
            {"_id": groupeId,
            "mods._id":moduleId
            },
            { 
                $set: 
                {
                    "mods.$.userId":userId
                }
            }
        );
            console.log("user1")
            console.log(user1)
        res.status(201).json(user1) 
    } catch (err) {
        console.log("Problème d'ajout du module' : "+err)
    }
}

async function removeModuleFromUser(req, res){

    try {
        const {userId, moduleId, groupeId, masseHoraireP} = req.body;
        console.log("Dans remove      +req.body")
        console.log(req.body)
        const user1 = await User.findByIdAndUpdate(
            userId,
            {
                $pull: 
                     {
                        "modules":
                            {
                                "groupe":groupeId, 
                                "module":moduleId 
                            }
                    }
            }
        );
        //Modification de la masse horaire affectée au formateur
        user1.masseHoraireAffectee = user1.masseHoraireAffectee - masseHoraireP
        user1.save().then( ()=> {
            //console.log("user1.masseHoraireAffectee")
            //console.log(user1.masseHoraireAffectee)
        }).catch((err)=>{
            console.log("MAJ masseHoraireAffectee échoué"+err)
        })
        //Supprimer(null) le userId du module du groupe (groupeId)
        const groupe1 = await Groupe.updateOne(
            {"_id": groupeId,
            "mods._id":moduleId
            },
            { 
                $set: 
                {
                    "mods.$.userId":null
                }
            }
        );
            console.log("user1")
            console.log(user1)
        res.status(201).json(user1) 
    } catch (err) {
        console.log("Problème de suppression du module' : "+err)
    }
}
async function ChangeEmploi(req, res){

    try {
        const {emploi} = req.body;
        const salleId = req.params.id;
        console.log("ChangeEmploi --> USER-+req.body")
        console.log(req.body)
        const salle1 = await User.findByIdAndUpdate(
            userId,
            {
                $set: 
                     {
                        "emploi":emploi,
                    }
            }
        );

    } catch (err) {
        console.log("Problème de modification d'emploi du formateur"+err)
    }

}

async function ChangeEmploi(req, res){

    try {
        const {emploi} = req.body;
        const userId = req.params.id;
        console.log("cange emploi sur user-+req.body")
        console.log(req.body)
        const user1 = await User.findByIdAndUpdate(
            userId,
            {
                $set: 
                     {
                        "emploi":emploi,
                    }
            }
        );
 

    } catch (err) {
        console.log("Problème de modification d'emploi du formateur : "+err)
    }

}
module.exports = { createUser, updateUser, deleteUser, getUser, getAllUser,addModuleToUser,removeModuleFromUser,ChangeEmploi};