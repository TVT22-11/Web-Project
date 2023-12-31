const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO account (fname, lname, username, password) VALUES ($1, $2, $3, $4)',
    GET_password: 'SELECT password FROM account WHERE username = $1',
    DELETE_account: 'DELETE FROM account WHERE username = $1 OR id_account = $2',

}

async function register(fname, lname, username, password) {
    const client = await pgPool.connect();
    try {
        await client.query(sql.REGISTER, [fname, lname, username, password]);
    } finally {
        client.release();
    }
}

async function getpassword(username) {
    const client = await pgPool.connect();
    try {
        const result = await client.query(sql.GET_password, [username]);
        if (result.rows.length > 0) {
            return result.rows[0].password;
        } else {
            return null;
        }
    } finally {
        client.release();
    }
}
async function deleteAccount(username, id_account) {
    const client = await pgPool.connect();
  
    try {
      const result = await pgPool.query(sql.DELETE_account, [username, id_account]);
      return result.rowCount; 
    } catch (err) {
      throw err;
    } finally {
      client.release();
    }
  }
module.exports = { register, getpassword, deleteAccount };
