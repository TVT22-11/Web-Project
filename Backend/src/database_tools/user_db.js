const pgPool = require('./pg_connection');

const sql = {
    GET_USER: 'SELECT fname, lname, username FROM account WHERE username = $1',
    GET_ALL_account: 'SELECT * FROM account',
    
}

async function getUser(username) {

    if (username) {
        let result = await pgPool.query(sql.GET_USER, [username]);
        return result.rows.length > 0 ? result.rows : null;
        }

    let result = await pgPool.query(sql.GET_ALL_account);
        return result.rows;
}


module.exports = {getUser};
