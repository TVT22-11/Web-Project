const router = require('express').Router();
const {getPreferences, updatePreferences} = require('../database_tools/preferences_db');



router.get('/' , async (req, res) => {

    try{
        const preferences = await getPreferences(req.query.username);
        if (preferences) {
            res.status(200).json(preferences.length === 1 ? preferences[0] : preferences);
        } else {
            res.status(404).send('User not found');
        }
    }catch(error){
        res.status(500).json(error);
    }
});


router.put('/', async (req, res) => {
    const username = req.body.username;
    const preferences = req.body.preferences;

    try{
        await updatePreferences(username, preferences);
        res.status(200).send('Preferences updated');
    }catch(error){
        res.status(500).json(error);
    }
});