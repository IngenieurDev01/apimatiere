const { Matiere } = require('../db/sequelize')
const matiere = require('../models/matiere')
// Exportation de tout app entier
module.exports = app => {
    app.put('/api/matiere/:id', (req, res) => {
        const id = req.params.id
        Matiere.update(req.body, {
            where:{ id: id }
        })
            .then(() =>{
               return Matiere.findByPk(id)
                    .then(matiere =>{
                        // Verification de l'existence de la Matiere
                        if(matiere === null)
                        {
                            const message = `La Matiere dont l'id ${id} n'existe pas`
                            res.status(404).json({ message })
                        }
                        const message= `la Matiere ${voiture.name} à ete modifier avec succes`
                        res.json({message, data: voiture})
                    })    
                    .catch(error => {
                        // Verifier si l'erreur est une instance de validation error
                        if(error instanceof ValidationError)
                        {
                            return res.status(400).json( { message: error.message, data: error } );
                        }
                        const message = `Serveur indisponible, veuillez réessayer plus tard`
                        res.status(500).json( { message, data: error } )
                    })    
            
            })

    })
}
