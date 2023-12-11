require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../auth/auth');
const { addMessage, getMessages} = require('../database_tools/message_db');
const upload = multer({ dest: 'uploads/' });


router.post('/post', upload.none(), async (req, res) => {
    const sender = req.body.sender;
    const content = req.body.content;
    
  
    try {
      await addMessage(sender, content);
      res.status(200).json({ message: 'message posted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/search', async (req, res) => {
    const id_party = req.query.id_party;
  
    try {
      const message = await getMessages(id_party);
      res.status(200).json({ name: id, MessageData: message });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  module.exports = router;