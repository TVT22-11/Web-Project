require ('dotenv').config()
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateToken } = require('../auth/auth');
const {getReview, Review, Delete_ReviewByAccount, Delete_ReviewById} = require('../database_tools/review_db');
const upload = multer({dest: 'uploads/'});


router.post('/post',  upload.none(), async (req, res) => {
    const id_account = req.body.id_account;
    const stars = req.body.stars;
    const comment = req.body.comment;
    const movie_id = req.body.movie_id;
    const movie_name = req.body.movie_name;
  
    try {
      await Review(id_account, stars, comment, movie_id, movie_name);
      res.status(200).json({ message: 'Review posted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  router.get('/', async (req, res) => {
    const movie_id = req.query.movie_id;
    const id_account = req.query.id_account;
  
    try {
      if (!movie_id && !id_account) {
        return res.status(400).json({ error: 'At least one of movie_id or id_account is required.' });
      }
  
      const review = await getReview(movie_id, id_account);
      res.status(200).json({ movie_id: movie_id, id_account: id_account, ReviewData: review });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


    router.delete('/account/:id_account', async (req, res) => {
      const id_account = req.params.id_account;
    
      try {
        await Delete_ReviewByAccount(id_account);
        res.status(200).json({ message: 'Reviews deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    router.delete('/:id_review', async (req, res) => {
      const id_review = req.params.id_review;
    
      try {
        await Delete_ReviewById(id_review);
        res.status(200).json({ message: 'Review deleted successfully' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
});

    router.get('/all', async (req, res) => {
      try {
        const reviews = await getReview(null, null); // Pass null for both movie_id and id_account
        res.status(200).json({ ReviewData: reviews });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;