const pgPool = require('./pg_connection');

const sql = {
    Review : 'INSERT INTO review (id_account, stars, comment, movie_id) VALUES ($1, $2, $3, $4)',
    GET_REVIEW_BY_ID: 'SELECT * FROM review WHERE movie_id = $1',
    Delete_Review: 'DELETE FROM review WHERE id_account = $1'
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
  

async function Review(id_account, stars, comment, movie_id){
    const client = await pgPool.connect();
    try{
        await client.query(sql.Review, [id_account, stars, comment, movie_id])
    }finally{
        client.release();
    }
}

async function Delete_Review(id_account){
    const client = await pgPool.connect();
    try{
        await client.query(sql.Delete_Review, [id_account])

    }finally{
        client.release();
    }
}

module.exports = {getReview, Review, Delete_Review};
