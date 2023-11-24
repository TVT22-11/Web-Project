require('dotenv').config()
const router = require('express').Router();
const {getUser} = require('../database_tools/user_db');
const {auth} = require('../auth/auth');


router.get('/' , async (req, res) => {

    try{
        const users = await getUser(req.query.username);
        if (users) {
            res.status(200).json(users.length === 1 ? users[0] : users);
        } else {
            res.status(404).send('User not found');
        }
    }catch(error){
        res.status(500).json(error);
    }
});

router.get('/personal', auth, async (req, res) => {
    try{
        const username = res.locals.username;
        res.status(200).json({username: username, personalData: "This is your personal data"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

module.exports = router;