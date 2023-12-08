const pgPool = require('./pg_connection');

const sql = {
  Group: 'INSERT INTO party (name, description, isprivate) VALUES ($1, $2, $3)',
  GET_GROUP_BY_ID: 'SELECT * FROM party WHERE name = $1',
  GET_ALL_GROUPS: 'SELECT id_party, name, description, isprivate FROM party', // Include isprivate in the SELECT statement
  Delete_Group: 'DELETE FROM party WHERE name = $1',
};

async function createParty(name, description, isprivate) {
  const client = await pgPool.connect();

  try {
    await client.query(sql.Group, [name, description, isprivate]);
  } finally {
    client.release();
  }
}

async function addMessage(id_party, sender, content) {
  const client = await pgPool.connect();

  try {
    const query = {
      text: 'INSERT INTO messages(id_party, sender, content) VALUES($1, $2, $3) RETURNING *',
      values: [id_party, sender, content],
    };

    const result = await client.query(query);
    return result.rows[0];
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function getMessages(id_party) {
  const client = await pgPool.connect();

  try {
    const query = {
      text: 'SELECT * FROM messages WHERE id_party = $1',
      values: [id_party],
    };

    const result = await client.query(query);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function getGroup(name) {
  const client = await pgPool.connect();

  try {
    if (name) {
      let result = await pgPool.query(sql.GET_GROUP_BY_ID, [name]);
      return result.rows.length > 0 ? result.rows : null;
    }
    throw new Error("Missing name parameter");
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}

async function getAllGroups() {
  const client = await pgPool.connect();

  try {
    let result = await client.query(sql.GET_ALL_GROUPS);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all groups:", error);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = { createParty, addMessage, getMessages, getGroup, getAllGroups };
