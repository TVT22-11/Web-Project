require('dotenv').config()
const router = require('express').Router();
const {getUser} = require('../database_tools/user_db');
const {authenticateToken} = require('../auth/auth');
const session = require('express-session');



router.get('/user/:userID', authenticateToken, async (req, res) => {

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



router.get('/', authenticateToken, async (req, res) => {

    try{
        const account = await getUser(res.locals.username);
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
    try {
      const username = res.locals.username;
      const account_id = res.locals.account_id;
  
      req.session.id_account = account_id;
  
      res.status(200).json({
        username: username,
        account_id: account_id,
        personalData: 'This is your personal data',
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  



module.exports = router;