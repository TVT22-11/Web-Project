const pgPool = require('./pg_connection');

const sql = {
  GET_PREFERENCES: 'SELECT * FROM preferences WHERE id_account_preference = $1',
  UPDATE_PREFERENCES: 'UPDATE preferences SET preferences = $2 WHERE id_account_preference = $1',
};

async function getPreferences(id_account_preference) {
  if (id_account_preference) {
    let result = await pgPool.query(sql.GET_PREFERENCES, [id_account_preference]);
    return result.rows.length > 0 ? result.rows : null;
  }

  return [];
}

async function updatePreferences(id_account_preference, preferences) {
  await pgPool.query(sql.UPDATE_PREFERENCES, [id_account_preference, preferences]);
}

module.exports = { getPreferences, updatePreferences };
