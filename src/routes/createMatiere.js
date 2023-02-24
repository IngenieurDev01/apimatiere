const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Matiere } = require('../db/sequelize')
const express = require("express")


// Exportation de tout app entier
module.exports = app => {
    app.post('/api/matieres', (req, res) => {
        Matiere.create(req.body)
            .then(matieres => {
                const message = `La matière ${req.body.name} a été enregistré avec succès`
                res.json({message, data: matieres})
            })        
           .catch(error => {
                // Verifier si l'erreur est une instance de validation error
                if(error instanceof ValidationError)
                {
                    return res.status(400).json( { message: error.message, data: error } );
                }

                if(error instanceof UniqueConstraintError)
                {
                    return res.status(400).json( { message: error.message, data: error } );
                }
                const message = `Serveur indisponible, veuillez réessayer plus tard`
                res.status(500).json( { message, data: error } )
            })
    })
}
