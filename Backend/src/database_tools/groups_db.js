const pgPool = require('./pg_connection');

const sql = {
  Group: 'INSERT INTO party (name, description, isprivate) VALUES ($1, $2, $3)',
  GET_GROUP_BY_ID: 'SELECT * FROM party WHERE name = $1',
  GET_ALL_GROUPS: 'SELECT id_party, name, description, isprivate FROM party', // Include isprivate in the SELECT statement
  Delete_Group: 'DELETE FROM party WHERE name = $1',
  ADD_GROUP_MEMBER: 'INSERT INTO account_party_relation (id_account, id_party) VALUES ($1, $2)',
  DELETE_GROUP_MEMBER: 'DELETE FROM account_party_relation WHERE id_account = $1 AND id_party = $2',
  SEND_MESSAGE: 'INSERT INTO party_messages (id_account, id_party, messages) VALUES ($1, $2, $3)',
  FETCH_MESSAGES: 'SELECT FROM party_messages WHERE id_party = $1',
};

async function sendMessage(id_account, id_party, messages) {
  const client = await pgPool.connect();
  try {
    await client.query(sql.SEND_MESSAGE, [id_account, id_party, messages]);   
  } finally {
    client.release();
  }
}

async function fetchMessages(id_party){
  const client = await pgPool.connect();
  try {
    if (id_party) {
      let result = await pgPool.query(sql.FETCH_MESSAGES, [id_party]);
      return result.rows.length > 0 ? result.rows : null;
    }
    throw new Error("Missing id_party parameter");
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
}


async function createParty(name, description, isprivate) {
  const client = await pgPool.connect();

  try {
    await client.query(sql.Group, [name, description, isprivate]);
  } finally {
    client.release();
  }
}

async function addMember(id_account, id_party) {
  const client = await pgPool.connect();

  try {
    await client.query(sql.ADD_GROUP_MEMBER, [id_account, id_party]);
  } finally {
    client.release();
  }
}

async function deleteMember(id_account, id_party){
  const client = await pgPool.connect();
  try{
      await client.query(sql.DELETE_GROUP_MEMBER, [id_account, id_party])

  }finally{
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

module.exports = { createParty, getGroup, getAllGroups, addMember, deleteMember, sendMessage, fetchMessages };
