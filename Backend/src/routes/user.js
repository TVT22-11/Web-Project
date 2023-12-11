require('dotenv').config()
const router = require('express').Router();
const {getUser, getUserByID} = require('../database_tools/user_db');
const {authenticateToken} = require('../auth/auth');
const session = require('express-session');



router.get('/user',  async (req, res) => {

    const id_account = req.query.id_account;
  
    try {
      const UserData = await getUserByID(id_account);
      res.status(200).json({ id_account: id_account, UserData: UserData });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



router.get('/', authenticateToken,  async (req, res) => {

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
      const id_account = res.locals.id_account;
  
      req.session.id_account = id_account;
  
      res.status(200).json({
        username: username,
        id_account: id_account,
        personalData: 'This is your personal data',
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  



module.exports = router;