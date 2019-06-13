const { Client } = require('pg')
      ,logger = require("../config/log")
      ,connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@10.202.70.111:5432/postgres';
    
const createTables =
    `CREATE TABLE IF NOT EXISTS
        F_USER(
            ID serial PRIMARY KEY,
            USERNAME VARCHAR (100) UNIQUE NOT NULL,
            EMAIL VARCHAR (355) NOT NULL,
            PASSWORD VARCHAR (100) NOT NULL,
            STATUS integer NOT NULL,
            CREATED TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            MODIFIED TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`;

const client = new Client({
    connectionString,
    ssl: true,
});

client.connect()
  .then(() => {
    client.query(createTables);  
    logger.info('connected: ', connectionString)
    })
  .catch(err => {
    client.end;
    logger.error('connection error', err.stack)
});

module.exports = client;