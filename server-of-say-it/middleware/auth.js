const jwt = require('jsonwebtoken');
const config = require('../config.json');

module.exports = (req, res, next) => {

    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied1');
    
    try{
        const decoded = jwt.verify(token, config.jwtKey);
        req.user = decoded
        next()
    }catch(ex){

        res.status(401).send('Access denied2');
    }
    
}