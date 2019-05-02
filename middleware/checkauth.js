const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
    try{
    jwt.verify(req.headers.authorization, 'thisissecretkeyfortokengeneration')
    next()
}catch{
    if(error){
        console.log(error)
    }
}
}