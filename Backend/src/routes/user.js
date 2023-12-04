require('dotenv').config()
const router = require('express').Router();
const {getUser} = require('../database_tools/user_db');
const {authenticateToken} = require('../auth/auth');


router.get('/' , async (req, res) => {

    try{
        const account = await getUser(req.query.username);
        if (account) {
            res.status(200).json(account.length === 1 ? account[0] : account);
        } else {
            res.status(404).send('User not found');
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('/personal', authenticateToken, async (req, res) => {
    try{
        const username = res.locals.username;
        res.status(200).json({username: username, personalData: "This is your personal data"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});



module.exports = router;