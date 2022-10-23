//const jwt = require("jsonwebtoken")
const Salle = require("../../models/salle")


async function getAllSalle(req, res){
    try {
        const salle1 = await Salle.find({});
        console.log("=================================");
        res.status(201).json(salle1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}

async function getSalle(req, res){
    try {
        const salle1 = await Salle.findById(req.params.id)
        console.log("================s=================");
        res.status(201).json(salle1);
    } catch (err) {
        console.log("Problème de récupération de données (getSalle): "+err)
    }
}

async function createSalle(req,res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const salle1 = new Salle({
            designation: req.body.designation,
            type: req.body.type,
            emploi: req.body.emploi
        })
        salle1.save().then( (salle1)=> {
            res.status(201).json({message:"Salle ajouté!"})
            console.log("-----------------------------------------------------------")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function updateSalle(req, res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const salle1 = await Salle.findById(req.params.id);
        console.log(salle1)
        Object.assign(salle1,req.body);

        salle1.save().then( (salle1)=> {
            res.status(201).json({message:"Salle modifié!"})
            console.log("***************************************")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteSalle(req, res){
    try {
        const salle1 = await Salle.findByIdAndDelete(req.params.id);
        console.log("+++++++++++++++++++++++++++++++++++++++")
        res.status(201).json(salle1)
    } catch (err) {
        console.log("Problème de suppression : "+err)
    }
}


async function ChangeEmploi(req, res){

    try {
        const {emploi} = req.body;
        const salleId = req.params.id;
        //console.log("ChangeEmploi --> SALLE -+req.body.emploi.lundi.seance1")
        //console.log(req.body.emploi.lundi.seance1)
        //console.log("ChangeEmploi --> SALLE emploi")
        //console.log(emploi)
        const salle1 = await Salle.findByIdAndUpdate(
            salleId,
            {
                $set: 
                     {
                        "emploi":emploi,
                    }
            }
        );
        //Modification ...... au formateur

    } catch (err) {
        console.log("Problème de modification d'emploi de la salle : "+err)
    }

}

module.exports = { createSalle, updateSalle, deleteSalle, getSalle, getAllSalle, ChangeEmploi};