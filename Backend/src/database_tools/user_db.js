const pgPool = require('./pg_connection');

const sql = {
    GET_USER: 'SELECT fname, lname, username, id_account FROM account WHERE username = $1',
    GET_ALL_account: 'SELECT * FROM account',
    GET_USER_BY_ID: 'SELECT username FROM account WHERE id_account = $1'
    
}

async function getUser(username) {

    if (username) {
        let result = await pgPool.query(sql.GET_USER, [username]);
        return result.rows.length > 0 ? result.rows : null;
        }

    let result = await pgPool.query(sql.GET_ALL_account);
        return result.rows;
}

async function getUserByID(id_account){
    const client = await pgPool.connect();

    try{
        if (id_account){
            let result = await pgPool.query(sql.GET_USER_BY_ID, [id_account]);
            return result.rows.length > 0 ? result.rows : null;
        }
        throw new Error("Missing id_account parameter");
    } catch(err){
        throw err;
    } finally{
        client.release();
    }
}

module.exports = {getUser, getUserByID};
