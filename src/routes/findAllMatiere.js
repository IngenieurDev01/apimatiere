const { where } = require('sequelize')
const { Matiere } = require('../db/sequelize')
const matiere = require('../db/matiereData')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

// Exportation de tout app entier
module.exports = app => {
    app.get('/api/matiere', auth, (req, res) => {
        // Afficher des modeles dee Matiere 
        if (req.query.modele){
            const modele = req.query.modele
            return Matiere.findAll({
                where:{
                    libelle:{
                        //Afficher les modeles qui contiennent
                       [ Op.like]:`%${libelle}%`
                    }
                },
                order :[['name', 'desc']] ,
                        //pour limiter le nombre à afficher
                limit :4
                
            }).then(matiere =>{
                const message = `${voitures.length} modéles ont été recuprees`
                return res.status(200).json({message,data:matiere})
            } ).catch(err =>{
                const message = "Le serveur n'est op dispo"
                res.status(500).json({message})
            })
        }
        //Afficher toutes les voitures 
        else 
        Matiere.findAll()
               .then(matiere => {
                const message = 'liste des Matieres'
                res.json({message, data: matiere})
            })  
             // Gestion de l'erreur
            .catch(error => {
             const message = `Serveur momentanément indisponible`
             res.status(500).json({ message, data: error })
            })
 
    })
}
