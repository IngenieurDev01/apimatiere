const privatekey = require('./privatekey')
const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const authorization=req.headers.authorization
    //On verifie si un jeton est transmis
    if(!authorization){
        const msg ="Vous  n'avez pas transmis de jwt"
        return res.status(400).json({msg})
    }
    //on recupere le jwt
    const token= authorization.split(" ")[1]
    // On verifie si le tken est valide 
    const tokenVerified =jwt.verify(token,privatekey,(error,tokenVerified)=>{
        if (error) {
            const msg="L'utilisateur n'est pas autorisé a la ressource"
            return res.status(401).json({msg})
        }
        //le token est bon 
        const userId= tokenVerified.userId
        if(req.body.userId && req.body.userId != userId){
            const msg = "l'identifiant de l'utilisateur est invalide"
            return res.status(401).json({msg})
        }
        //le token est bon 
        else{
            next()
        }
    })
}