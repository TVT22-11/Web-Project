require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../auth/auth');

const { createParty, getGroup, getAllGroups, addMember, deleteMember, sendMessage, fetchMessages, deleteParty} = require('../database_tools/groups_db');

const upload = multer({ dest: 'uploads/' });


router.post('/send-message', upload.none(), async (req,res) =>{
  const id_account = req.body.id_account;
  const id_party = req.body.id_party;
  const messages = req.body.messages;
  try {
    await sendMessage(id_account, id_party, messages);
    res.status(200).json({ message: 'Post Send successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/fetch-messages', async (req, res) =>{
  const id_party = req.query.id_party;
  try {
    const messages = await fetchMessages(id_party);
    res.status(200).json({ message: messages});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/post', upload.none(), async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const isprivate = req.body.isprivate;
const owner = req.body.owner;

  try {
    await createParty(name, description, isprivate, owner);
    res.status(200).json({ message: 'Group posted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/deleteParty', upload.none(), async (req, res) => {
  const id_party = req.body.id_party;
  const id_account = req.body.id_account;
  
 
  try {
    await deleteParty(id_party, id_account);
    res.status(200).json({ message: 'Party deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/join', upload.none(), async (req, res) => {
  const id_account = req.body.id_account;
  const id_party = req.body.id_party;
 
  try {
    await addMember(id_account, id_party);
    res.status(200).json({ message: 'Member Added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/deleteMember', upload.none(), async (req, res) => {
  const id_account = req.body.id_account;
  const id_party = req.body.id_party;
 
  try {
    await deleteMember(id_account, id_party);
    res.status(200).json({ message: 'Member deleted successfully' });
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
    res.status(200).json({ GroupData: group });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
