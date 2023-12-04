const router = require('express').Router();
const { getPreferences, updatePreferences } = require('../database_tools/preferences_db');
const { authenticateToken } = require('../auth/auth');


const handleErrors = (res, error) => {
  console.error(error);
  res.status(500).json({ error: error.message || 'Internal Server Error' });
};

router.get('/', async (req, res) => {
  try {
    const preferences = await getPreferences(req.query.username);
    if (preferences) {
      res.status(200).json(preferences.length === 1 ? preferences[0] : preferences);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    handleErrors(res, error);
  }
});

router.put('/', authenticateToken, async (req, res) => {
  try {
    const { username, preferences } = req.body;

    if (!username || !preferences) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    await updatePreferences(username, preferences);
    res.status(200).send('Preferences updated');
  } catch (error) {
    handleErrors(res, error);
  }
});

module.exports = router;
