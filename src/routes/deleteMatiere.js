const { Matiere } = require('../db/sequelize')
// Exportation de tout app entier
module.exports = app => {
    app.delete('/api/matiere/:id', (req, res) => {
        const id = req.params.id
        // Recuperation de la Matiere avant suppression
        Matiere.findByPk(id)
            .then(v => {
                const matiereDeleted = v
                // vérification de l'existance de la Matiere 
                if (v === null) {
                    message = "La Matiere que vous voulez supprimer n' existe pas"
                  return  res.status(404).json({ message })
                }
                // Suppression de la Matiere
                return Matiere.destroy({
                    where: { id: id }
                })

                    .then(() => {
                        let message = `la Matiere ${matiereDeleted.name} a ete supprimée avec succes`
                        res.json({ message, data: matiereDeleted })
                    })
            })
            .catch(error => {
                const message = `Le serveur est momentanement indisponible`
                res.status(500).json({ message, data: error })
            })

    })
}

