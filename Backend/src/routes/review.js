require ('dotenv').config()
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../auth/auth');
const {getReview, Review} = require('../database_tools/review_db');
const upload = multer({dest: 'uploads/'});


router.post('/post', upload.none(), async (req, res) => {
    const account_id = req.body.account_id;
    const stars = req.body.stars;
    const comment = req.body.comment;
    const movie_id = req.body.movie_id;
  
    try {
      await Review(account_id, stars, comment, movie_id);
      res.status(200).json({ message: 'Review posted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



router.get('/', async (req, res) => {
    const movie_id = req.query.movie_id;
  
    try {
      const review = await getReview(movie_id);
      res.status(200).json({ movie_id: movie_id, ReviewData: review });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;