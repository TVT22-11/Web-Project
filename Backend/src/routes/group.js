require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../auth/auth');
const { createParty, getGroup, getAllGroups, addMessage, getMessages } = require('../database_tools/groups_db');
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

// Add a new message to a group
router.post('/group/:id_party', async (req, res) => {
  const id_party = req.params.id_party;
  const sender = req.body.sender;
  const content = req.body.content;

  try {
    const message = await addMessage(id_party, sender, content);
    res.status(200).json({ message: 'Message posted successfully', data: message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all messages for a specific group
router.get('/group/:id_party', async (req, res) => {
  const id_party = req.params.id_party;

  try {
    const messages = await getMessages(id_party);
    res.status(200).json({ messages: messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
