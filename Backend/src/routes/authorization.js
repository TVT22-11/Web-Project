require ('dotenv').config()
const router = require('express').Router();
const {register, getPw} = require('../database_tools/auth_db');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const bcrypt = require('bcrypt');
const { createToken } = require('../auth/auth');



router.post('/register', upload.none(), async (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const pw = req.body.pw;

    try {
        const pwHash = await bcrypt.hash(pw, 10);
        await register(fname, lname, username, pwHash);
        const token = createToken(username);
        res.status(200).json({ jwtToken: token });
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', upload.none(), async (req, res) => {

    const username = req.body.username;
    const pw = req.body.pw;

    try {
        const db_pw = await getPw(username);

        if (db_pw) {
            const isAuth = await bcrypt.compare(pw, db_pw);
            if (isAuth) {
                const token = createToken(username);
                res.status(200).json({jwtToken: token});
            } else {
                res.status(401).send('Incorrect password');
            }
        }else {
            res.status(404).send('User not found');
        }
    } catch(err) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
    });

    module.exports = router;