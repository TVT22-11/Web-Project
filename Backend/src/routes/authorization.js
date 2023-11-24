require ('dotenv').config()
const router = require('express').Router();
const {register, getPw} = require('../database_tools/auth_db');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const bcrypt = require('bcrypt');
const { createToken } = require('../auth/auth');



router.post('/register', upload.none(), async (req, res) => {
    const fname = body.fname;
    const lname = body.lname;
    const username = body.username;
    const pw = body.pw;

    try {
        const pwHash = await bcrypt.hash(pw, 10);
        await register(fname, lname, username, pwHash);
        const token = createToken(username);
        res.status(200).json({jwtToken: token});
    }  catch(err) {
        res.status(500).json({ error: err.message });
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