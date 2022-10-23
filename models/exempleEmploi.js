const exempleSeance = {
    userId: null,
    groupeId: null,
    salleId:null
};
const exempleJour = {
                    "seance1":exempleSeance,
                    "seance2":exempleSeance,
                    "seance3":exempleSeance,
                    "seance4":exempleSeance
                };

const exempleEmploi = {
    "lundi": exempleJour,
    "mardi": exempleJour,
    "mercredi": exempleJour,
    "jeudi": exempleJour,
    "vendredi": exempleJour,
    "samedi": exempleJour
};

module.exports = exempleEmploi