require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../auth/auth');
const { createParty, getGroup, getAllGroups} = require('../database_tools/groups_db');
const upload = multer({ dest: 'uploads/' });

router.post('/post', upload.none(), async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const isprivate = req.body.isprivate;

  try {
    await createParty(name, description, isprivate);
    res.status(200).json({ message: 'Group posted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/search', async (req, res) => {
  const name = req.query.name;

  try {
    const group = await getGroup(name);
    res.status(200).json({ name: name, GroupData: group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const group = await getAllGroups();
    res.status(200).json({ GroupDataData: group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
