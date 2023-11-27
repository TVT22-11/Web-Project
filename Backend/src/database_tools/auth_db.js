const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO users (fname, lname, username, pw) VALUES ($1, $2, $3, $4)',
    GET_PW: 'SELECT pw FROM users WHERE username = $1',
}

async function register(fname, lname, username, pw) {
    const client = await pgPool.connect();
    try {
        await client.query(sql.REGISTER, [fname, lname, username, pw]);
    } finally {
        client.release();
    }
}

async function getPw(username) {
    const client = await pgPool.connect();
    try {
        const result = await client.query(sql.GET_PW, [username]);
        if (result.rows.length > 0) {
            return result.rows[0].pw;
        } else {
            return null;
        }
    } finally {
        client.release();
    }
}

module.exports = { register, getPw };
