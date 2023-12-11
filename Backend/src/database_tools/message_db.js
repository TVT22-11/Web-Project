const pgPool = require('./pg_connection');

const sql = {
    ADD_MESSAGE: 'INSERT INTO messages (sender, content) VALUES ($1, $2)',
    GET_MESSAGES_BY_GROUP_ID: 'SELECT * from messages WHERE id_party = $2'
}

async function addMessage(sender, content) {
    const client = await pgPool.connect();
  
    try {
      await client.query(sql.ADD_MESSAGE, [sender, content]);
    } finally {
      client.release();
    }
  }

  async function getMessages(id_party) {
    const client = await pgPool.connect();
  
    try {
      if (id_party) {
        let result = await pgPool.query(sql.GET_MESSAGES_BY_GROUP_ID, [id_party]);
        return result.rows.length > 0 ? result.rows : null;
      }
      throw new Error("Missing name parameter");
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }

  module.exports = { addMessage, getMessages };