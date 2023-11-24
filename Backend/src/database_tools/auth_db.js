const pgPool = require('./pg_connection');

const sql = {
    REGISTER: 'INSERT INTO users (fname,lname,username,pw) VALUES ($1, $2, 3$, $4)',
    GET_PW: 'SELECT pw FROM users WHERE username = $1',
}

async function register(fname, lname, username, pw) {
        await client.query(sql.REGISTER, [fname, lname, username, pwHash]);
}

async function getPw(username) {
    const result = await client.query(sql.GET_PW, [username]);
   if(result.rows.lenght>0){ 
    return result.rows[0].pw;
   }else{
       return null;
   }
}   

module.exports = {register, getPw};