import user_db from './user_db';

const pgPool = require('./pg_connection');


user_db.getUser('test').then((result) => {
    console.log(result);
}).catch((err) => { console.log(err); } );