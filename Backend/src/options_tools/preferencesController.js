// preferencesController.js

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const savePreferences = async ({ id_account, timezone, darkMode }) => {
  try {
    // Save preferences to the database
    const result = await pool.query(
      'INSERT INTO user_preferences (id_account, timezone, dark_mode) VALUES ($1, $2, $3) RETURNING *',
      [id_account, timezone, darkMode]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Error saving preferences:', error);
    throw error;
  }
};

module.exports = {
  savePreferences,
};
