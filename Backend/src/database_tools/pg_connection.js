require('dotenv').config();
const { Pool } = require('pg');

const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD
});

pgPool.connect((err) => {
    if (err) {
        console.error(err.message);
    }
});

module.exports = pgPool;
