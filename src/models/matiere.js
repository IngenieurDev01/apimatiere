const {Sequelize, DataTypes} = require('sequelize')
module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('Matiere',{
            id:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            libelle:{
                type:DataTypes.STRING,
                allowNull: false
            },
           
            credit:{
                type:DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: 'le champ crédit doit etre un nombre entier' },
                    notNull: { msg: 'Ce champ est requis' }
                }    
            },
        },
        {
            timestamp:true,
            createdAt:"uploadedAt", //on renomme le champ createdAt
            updatedAt:false  // on ne genere pas le champ updatedAt
        }
    )
}