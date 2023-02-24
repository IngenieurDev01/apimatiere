const { Matiere } = require('../db/sequelize')

// Exportation de tout app entier
module.exports = app => {
    app.get('/api/matiere/:id', (req, res) => {
        const id = req.params.id
        Matiere.findByPk(id)
            .then(matiere => {
                let message = "récuperation d'une Matiere"
                //Erreur liée aux données non dispo dans la BD
                if(matiere === null) 
                {
                    const message = `la Matiere ${id} n'a pas pu être récuperée`
                    res.status(404).json({ message })
                }

                res.json({message, data: voiture})
            })
            // Erreur au niveau du serveur
            .catch(err => {
            const message = "le serveur est indispo veuillez reéssayer plutard"
            res.json({message, err})
        })
    })
}
