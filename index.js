// Chargement des modules
const express = require('express')
const matieres = require('./src/db/matiereData')
const morgan = require('morgan')
const {Sequelize, DataTypes} = require('./src/db/sequelize')
const MatiereModel = require('./src/models/matiere')
const sequelize = require('./src/db/sequelize')
const bodyParser = require('body-parser')
const data = require("./src/db/matiereData")


// Création d'une instance d'express
const app = express()
const hote = '127.0.0.1'
const port = 2000

app
    .use(morgan('dev'))
    .use(bodyParser.json())

// Initialisation des données
sequelize.initDB()

//mise en place des endpoints

// Endpoint de la racine
app.get('/', (req, res) => {
    res.send("Bienvenue dans la mise en place d'une API")
})

// app.get('/api/matieres', (req, res) => {
//     res.send("Nous essayons d'accéder à notre ressources de matiere")
// })

require('./src/routes/createMatiere')(app)

// Mise a jour d'une matière
require('./src/routes/updateMatiere')(app)

//endpoint to findAll
const findAllMatiere = require('./src/routes/findAllMatiere')
findAllMatiere(app)

// Récuperation d'une Matiere
require('./src/routes/findMatiereByPk')(app)

// Ajout d'une Matiere
require('./src/routes/createMatiere')(app)

// Suppression d'une Matiere
require('./src/routes/deleteMatiere')(app)

//login user
require('./src/routes/login')(app)

// Démarrage du serveur
app.listen(port, () => {
    console.log(`server is running on ${hote}:${port}`)
})
