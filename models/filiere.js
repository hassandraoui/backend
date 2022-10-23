const mongoose = require("mongoose")

const filiereSchema = new mongoose.Schema({

	designation: String,
    codeFiliere: String,
    modules: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Module"
    }],
})
module.exports = mongoose.model("Filiere", filiereSchema)