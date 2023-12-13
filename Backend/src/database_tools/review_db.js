const pgPool = require('./pg_connection');

const sql = {
    Review : 'INSERT INTO review (id_account, stars, comment, movie_id, movie_name) VALUES ($1, $2, $3, $4, $5)',
    GET_REVIEW_BY_ID: `
    SELECT review.*, account.username
    FROM review
    JOIN account ON review.id_account = account.id_account
    WHERE 
    ($1::integer IS NULL OR review.movie_id = $1::integer) AND
    ($2::integer IS NULL OR review.id_account = $2::integer)
  `,
    Delete_Review: 'DELETE FROM review WHERE id_account = $1',
    Delete_ReviewByAccount: 'DELETE FROM review WHERE id_account = $1',
    Delete_ReviewById: 'DELETE FROM review WHERE id_review = $1',
};

async function getReview(movie_id, id_account) {
    const client = await pgPool.connect();

    try {
        let result = await pgPool.query(sql.GET_REVIEW_BY_ID, [movie_id, id_account]);
        return result.rows.length > 0 ? result.rows : null;
    } catch (err) {
        throw err;
    } finally {
        client.release();
    }
}

  

async function Review(id_account, stars, comment, movie_id, movie_name){
    const client = await pgPool.connect();
    try{

        if(!comment){
          throw new Error('Comment is missing.');
        }

        await client.query(sql.Review, [id_account, stars, comment, movie_id, movie_name])
    } catch(error){

      console.error('Error in Review function:', error.message);
      throw error;
    } finally {
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
async function Delete_ReviewByAccount(id_account) {
    const client = await pgPool.connect();
    try {
      await client.query(sql.Delete_ReviewByAccount, [id_account]);
    } finally {
      client.release();
    }
  }
  
  async function Delete_ReviewById(id_review) {
    const client = await pgPool.connect();
    try {
      await client.query(sql.Delete_ReviewById, [id_review]);
    } finally {
      client.release();
    }
  }

module.exports = {getReview, Review, Delete_Review, Delete_ReviewByAccount, Delete_ReviewById};
