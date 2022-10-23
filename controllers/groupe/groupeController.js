//const jwt = require("jsonwebtoken")
const Filiere = require("../../models/filiere");
const Groupe = require("../../models/groupe");
//const { Module } = require("../../models/module");
const Module = require("../../models/module")


async function getAllGroupe(req, res){
    try {
        const groupe1 = await Groupe.find({})
           // .populate("filiereId")
            //.populate('mods');
        console.log("=================================");
        res.status(201).json(groupe1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}

async function getGroupe(req, res){
    try {
        const groupe1 = await Groupe.findById(req.params.id)
        .populate('mods');
        console.log("=================================");
        res.status(201).json(groupe1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}

async function createGroupe(req,res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const groupe1 = new Groupe({
            designation: req.body.designation,
            filiereId: req.body.filiereId
        })

        groupe1.save().then( (groupe1)=> {
            res.status(201).json({message:"Groupe ajouté!"})
            console.log("-----------------------------------------------------------")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })

       //Ajouter les modules au moment de la création du group
       console.log("111111111111111111")
        const groupeId = groupe1._id;
        const filiere1 = await Filiere.findOne({"_id":req.body.filiereId}).populate("modules");
        console.log("22222222222222222222")
        const modules=filiere1.modules
        console.log("modules")
        console.log(modules)
        console.log("3333333333333333333333")
        modules.map( async (module)=>{
            console.log("44444444444444444444444444444444")
            console.log("module")
            console.log(module)
            const setGroupeId = { "groupeId": groupeId};
            Object.assign(module,setGroupeId); 

            const groupe2 = await Groupe.findByIdAndUpdate(
                groupeId,
                { 
                    $push:  
                    { 
                        mods:new Module(module)
                    } 
                }
            );
        } )
       
    } catch (err) {
        console.log("Problème d'ajout des modules au groupe: " +err.message)
    }
}

async function updateGroupe(req, res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const groupe1 = await Groupe.findById(req.params.id);
        console.log("----req.body:")
        console.log(req.body)
        console.log("----fin req.body:")
        console.log(groupe1)
        Object.assign(groupe1,req.body);

        console.log("Après modification du groupe")
        console.log(groupe1)

        groupe1.save().then( (groupe1)=> {
            res.status(201).json({message:"Groupe modifié!"})
            console.log("***************************************")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function deleteGroupe(req, res){
    try {
        const groupe1 = await Groupe.findByIdAndDelete(req.params.id);
        console.log("+++++++++++++++++++++++++++++++++++++++")
        res.status(201).json(groupe1)
    } catch (err) {
        console.log("Problème de suppression : "+err)
    }
}

async function addModuleToGroupe(req, res){

    try {
        const {moduleFull, groupeId} = req.body;
        console.log("req.body")
        console.log(req.body)
        console.log("addModuleToGroupe --> moduleFull")
        console.log(moduleFull)
        const groupe1 = await Groupe.findByIdAndUpdate(
            groupeId,
            { 
                $push: {mods:moduleFull}
            }
        );
        console.log("Ajout du module au groupe réussi")
        res.status(201).json(groupe1) 
    } catch (err) {
        console.log("Problème d'ajout du module au groupe : "+err)
    }
}

async function removeModuleFromGroupe(req, res){
    try {
        const {moduleFull, groupeId} = req.body;
        console.log("req.body")
        console.log(req.body)
        console.log("moduleFull")
        console.log(moduleFull)
        const groupe1 = await Groupe.findByIdAndUpdate(
            groupeId,
            { 
                $pull: {mods:moduleFull}
            }
        );
        console.log("Suppression du module du groupe réussie")
        res.status(201).json(groupe1) 
    } catch (err) {
        console.log("Suppression du module du groupe échouée : "+err)
    }
}


async function declareAffectationModuleOfGroupe(req, res){
    try {
        const {groupeModuleId, groupeId} = req.body;
        const groupe1 = await Groupe.updateOne(
            {"_id": groupeId,
            "mods._id":groupeModuleId
            },
            { 
                $set: 
                {
                    "mods.$.affecte":true
                }
            }
        );
        console.log("Déclaration de l'affectation du module du groupe réussi")
        res.status(201).json(groupe1) 
    } catch (err) {
        console.log("Problème de déclaration de l'affectation du module du groupe  : "+err)
    }
}
async function declareNonAffectationModuleOfGroupe(req, res){
    try {
        const {groupeModuleId, groupeId} = req.body;
        console.log("declareNonAffectationModuleOfGroupe --> req.body")
        console.log(req.body)
        const groupe1 = await Groupe.updateOne(
            {"_id": groupeId,
            "mods._id":groupeModuleId
            },
            { 
                $set: 
                {
                    "mods.$.affecte":false
                }
            }
        );
        console.log("Déclaration du NON affectation du module du groupe réussi")
        res.status(201).json(groupe1) 
    } catch (err) {
        console.log("Problème de déclaration du NON affectation du module du groupe  : "+err)
    }
}

async function ChangeEmploi(req, res){

    try {
        const {emploi} = req.body;
        const groupeId = req.params.id;
        //console.log("change emploi sur groupe-+req.body")
        //console.log(req.body)
        const groupe1 = await Groupe.findByIdAndUpdate(
            groupeId,
            {
                $set: 
                     {
                        "emploi":emploi,
                    }
            }
        );
 

    } catch (err) {
        console.log("Problème de modification d'emploi du groupe' : "+err)
    }

}

module.exports = { createGroupe, updateGroupe, deleteGroupe, getGroupe, getAllGroupe, addModuleToGroupe, removeModuleFromGroupe, declareAffectationModuleOfGroupe,declareNonAffectationModuleOfGroupe, ChangeEmploi};