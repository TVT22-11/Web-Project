require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../auth/auth');
const { createParty, getGroup, getAllGroups, addMember, deleteMember} = require('../database_tools/groups_db');
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

router.post('/post', upload.none(), async (req, res) => {
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

router.delete('/deleteFromGroup', upload.none(), async (req, res) => {
  const { id_account, id_party } = req.body;

  try {
    if (!id_account && !id_party) {
      return res.status(400).json({ error: 'Either username or group_id must be provided' });
    }

    // Assuming deleteUserFromGroup is a function that deletes a user from a group
    const rowCount = await deleteMember(id_account, id_party);

    if (rowCount === 1) {
      return res.status(200).json({ message: 'User deleted from the group successfully' });
    } else {
      return res.status(404).json({ error: 'User not found in the group' });
    }
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
