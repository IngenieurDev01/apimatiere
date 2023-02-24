const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const privatekey = require('../auth/privatekey')
const jwt = require('jsonwebtoken')

module.exports = app => {
    app.post('/api/login/', (req, res) => {
        User.findOne({
            username:req.body.username  
        })
        .then(user =>{
            if(user != null) {
                bcrypt.compare(req.body.password,user.password)
                .then(passwordvalid=>{
                    if(passwordvalid){
                        const token= jwt.sign(
                            {userId:user.id},
                            privatekey,
                            {expiresIn:'5mn'} 
                        )
                        const msg="l'utilisateur est bien authentifié" 
                        res.status(200).json({msg, data: user, token})   
                    }else{
                        const msg="mot de passe incorrect"
                        res.status(400).json({msg})
                    } 
                })
                .catch(error=>{
                    res.status(500).json({error})
                })
            }
        })  
    })
}  