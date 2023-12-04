require('dotenv').config()
const router = require('express').Router();
const {getUser} = require('../database_tools/user_db');
const {authenticateToken} = require('../auth/auth');


router.get('/user/:userID', async (req, res) => {
    try{
        const userID = req.params.userID;
        const user = await getUser(userID);
        res.status(200).json(user);

        if (!userID) {
            res.status(404).send('User not found');
        }
        res.json(user || {});
    }catch(error){
        console.error(error);
        res.status(500).json(error);
    }
});



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