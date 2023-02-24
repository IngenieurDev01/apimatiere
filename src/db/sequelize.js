const { Sequelize, DataTypes } = require("sequelize")
const matieres = require("./matiereData")
const MatiereModel = require('../models/matiere')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')


// configuration de sequelize
const sequelize = new Sequelize(
    'apimatiere', // nom de la base de donnée
    'root', // nom d'utilisateur de la BD
    '', // mot de passe du user de la BD
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            timezone: 'Etc/GMT'
        },
        logging: false
    }
)

// Instanciation du modèle
const Matiere = MatiereModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

// Synchronisation et remplissage de la BD
const initDB = () => {
    return sequelize.sync({ force: true })
        .then(() => {
            console.log('Synchronisation ok !')
            bcrypt.hash("toto", 10)
            .then(hash => {
                User.create({
                    username : "user",
                    password:hash
                }).then(res => console.log(res.toJSON()))
                .catch(err => console.error('Insertion echoué'))
            })
            
            matieres.map(v => {
                Matiere.create({
                    libelle: v.libelle,              
                    credit: v.credit,
                    
                }).then(res => console.log(res.toJSON()))
                    .catch(err => console.error('Insertion echoué', err))
            })
        })
        .catch(error => console.error('Synchronisantion echoué : ', error))

}

module.exports = {Matiere, User, initDB}
