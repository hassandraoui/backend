//const jwt = require("jsonwebtoken")
const Filiere = require("../../models/filiere")


async function getAllFiliere(req, res){
    try {
        const filiere1 = await Filiere.find({});
        console.log("=================================");
        res.status(201).json(filiere1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}

async function getFiliere(req, res){
    try {
        const filiere1 = await Filiere.findById(req.params.id).populate('modules');
        console.log("=================================");
        res.status(201).json(filiere1);
    } catch (err) {
        console.log("Problème de récupération de données (getFiliere): "+err)
    }
}

async function createFiliere(req,res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const filiere1 = new Filiere({
            designation: req.body.designation,
            codeFiliere: req.body.codeFiliere,
            niveau: req.body.niveau
        })
        filiere1.save().then( (filiere1)=> {
            res.status(201).json({message:"Filiere ajouté!"})
            console.log("-----------------------------------------------------------")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function updateFiliere(req, res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const filiere1 = await Filiere.findById(req.params.id);
        console.log(filiere1)
        Object.assign(filiere1,req.body);
        //user1.save();
        //const user1 = await Character.findOneAndUpdate({_id:req.body._id}, update});

        //await new User({ ...req.body, password: hashPassword }).save();

        filiere1.save().then( (filiere1)=> {
            res.status(201).json({message:"Filiere modifié!"})
            console.log("***************************************")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteFiliere(req, res){
    try {
        const filiere1 = await Filiere.findByIdAndDelete(req.params.id);
        console.log("+++++++++++++++++++++++++++++++++++++++")
        res.status(201).json(filiere1)
    } catch (err) {
        console.log("Problème de suppression : "+err)
    }
}

async function addModuleToFiliere(req, res){
    try {
        console.log(req.body)
        const {moduleId, filiereId} = req.body;
        const filiere1 = await Filiere.findByIdAndUpdate(
            filiereId,
            { 
                $push: 
                {
                   modules:moduleId,
               }
            
            }
        );
        res.status(201).json(filiere1) 
    } catch (err) {
        console.log("Problème d'ajout du module' : "+err)
    }
}
async function removeModuleFromFiliere(req, res){
    try {
        console.log(req.body)
        const {moduleId, filiereId} = req.body;
        const filiere1 = await Filiere.findByIdAndUpdate(
            filiereId,
            { 
                $pull: 
                {
                   modules:moduleId,
               }
            
            }
        );
        res.status(201).json(filiere1) 
    } catch (err) {
        console.log("Problème de suppression du module' : "+err)
    }
}


module.exports = { createFiliere, updateFiliere, deleteFiliere, getFiliere, getAllFiliere, addModuleToFiliere,removeModuleFromFiliere};