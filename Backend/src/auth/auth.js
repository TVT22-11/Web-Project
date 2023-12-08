require('dotenv').config();
const jwt = require('jsonwebtoken');


function authenticateToken(req,res,next){

    const token = req.headers.authorization?.split(' ')[1];

    try{
        const username = jwt.verify(token, process.env.JWT_SECRET_KEY).username;
        const id_account = jwt.verify(token, process.env.JWT_SECRET_KEY).id_account;
        res.locals.username = username;
        res.locals.id_account = id_account;
        next();
    }catch(err){
        res.status(403).send('Access forbidden.');
    }
}

/**
 * Tool function that creates a JWT token containing the username. 
 */
function createToken(username, id_account){
    return jwt.sign({username: username, id_account: id_account}, process.env.JWT_SECRET_KEY);
}


module.exports =  {authenticateToken, createToken};