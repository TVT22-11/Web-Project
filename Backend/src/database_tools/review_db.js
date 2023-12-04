const pgPool = require('./pg_connection');

const sql = {
    Review : 'INSERT INTO review (account_id, stars, comment, movie_id) VALUES ($1, $2, $3, $4)',
    GET_REVIEW_BY_ID: 'SELECT * FROM review WHERE movie_id = $1',
};

async function getReview(movie_id) {
    const client = await pgPool.connect();
    
    try {
      if (movie_id) {
        let result = await pgPool.query(sql.GET_REVIEW_BY_ID, [movie_id]);
        return result.rows.length > 0 ? result.rows : null;
      }
      throw new Error("Missing movie_id parameter");
  
    } catch (err) {
    
      throw err;
    } finally {
      client.release();
    }
  }
  

async function Review(account_id, stars, comment, movie_id){
    const client = await pgPool.connect();
    try{
        await client.query(sql.Review, [account_id, stars, comment, movie_id])
    }finally{
        client.release();
    }
}

module.exports = {getReview, Review};
