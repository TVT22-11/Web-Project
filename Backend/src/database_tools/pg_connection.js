require('dotenv').config();
const { Pool } = require('pg');

const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl:true
});

pgPool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch((err) => console.error('Error connecting to PostgreSQL:', err.message));

module.exports = pgPool;
