//const jwt = require("jsonwebtoken")
const Filiere = require("../../models/filiere");
const Module = require("../../models/module")


async function getAllModule(req, res){
    try {
        const module1 = await Module.find({})
        console.log("=================================");
        res.status(201).json(module1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}

async function getModule(req, res){
    try {
        const module1 = await Module.findById(req.params.id)
        console.log("=================================");
        res.status(201).json(module1);
    } catch (err) {
        console.log("Problème de récupération de données : "+err)
    }
}
async function addModuleToFiliere(moduleId, filiereId){
    try {
        const filiere1 = await Filiere.findByIdAndUpdate(
            filiereId,
            { 
                $push: 
                {
                   modules:moduleId,
               }
            }
        );
        console.log("Ajout du module à la filière")
    } catch (err) {
        console.log("Problème d'ajout du module à la filière : "+err)
    }
}

async function createModule(req,res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        console.log(req.body)
        const module1 = new Module({
            designation: req.body.designation,
            codeModule: req.body.codeModule,
            masseHoraireP: req.body.masseHoraireP,
            masseHoraireD: req.body.masseHoraireD,
            filiereId: req.body.filiereId,
            regional: req.body.regional
        })
        module1.save().then( (module1)=> {
            res.status(201).json({message:"Module ajouté!"})
            console.log("-----------------------------------------------------------")
            const filiereId = module1.filiereId;
            const moduleId = module1._id;
        
            addModuleToFiliere(moduleId, filiereId)
            console.log("moduleId")
            console.log(moduleId)
            console.log("filiereId")
            console.log(filiereId)
            console.log("Module ajouté à sa filière!!")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })
    } catch (err) {
        console.log(err.message)
    }
}

async function updateModule(req, res){
    if(!req.body) {
        return res.status(401).json({message:"pas de données envoyées"})
    }
    try {
        const module1 = await Module.findById(req.params.id);
        console.log(module1)
        Object.assign(module1,req.body);

        module1.save().then( (module1)=> {
            res.status(201).json({message:"Module modifié!"})
            console.log("***************************************")
            }).catch((err)=>{
                console.log("Problème de sauvegarde : "+err)
        })

    } catch (err) {
        console.log(err.message)
    }
}

async function deleteModule(req, res){
    try {
        const module1 = await Module.findByIdAndDelete(req.params.id);
        console.log("+++++++++++++++++++++++++++++++++++++++")
        res.status(201).json(module1)
    } catch (err) {
        console.log("Problème de suppression : "+err)
    }
}

async function findModulesByFiliereId(req, res){
    try {
        const modules1 = await Module.find({filiereId:req.params.id});
        res.status(201).json(modules1)

    } catch (error) {
        console.log("problème de récupération des modules par filiereId: "+ error)
    }
}

module.exports = { createModule, updateModule, deleteModule, getModule, getAllModule, findModulesByFiliereId};