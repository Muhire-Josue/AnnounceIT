/* eslint-disable no-console */
import 'dotenv/config';
import pg from 'pg';

const { NODE_ENV } = process.env;
const env = NODE_ENV === 'test' || NODE_ENV === 'dev' ? `_${NODE_ENV}`.toUpperCase() : '';

const pool = new pg.Pool({
  connectionString: process.env[`DATABASE_URL${env}`],
});

pool.on('connect', () => {
  console.log('connected to the Database');
});

const dropTables = () => {
  const usersTable = 'DROP TABLE IF EXISTS users;';
  const announcementsTable = 'DROP TABLE IF EXISTS announcements;';

  const dropTablesQueries = `${announcementsTable};${usersTable}`;

  pool
    .query(dropTablesQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

const createTables = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        "firstName" VARCHAR(50) NOT NULL,
        "lastName" VARCHAR(50) NOT NULL,
        email VARCHAR(100) NULL,
        "phoneNumber" VARCHAR(20) NOT NULL,
        password TEXT NOT NULL,
        address VARCHAR(50) NOT NULL,
        "isAdmin" BOOLEAN NOT NULL,
        "createdDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`;

  const announcementsTable = `CREATE TABLE IF NOT EXISTS
      announcements(
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        status VARCHAR(10) NULL,
        owner VARCHAR(10),
        "endDate" VARCHAR(20),
        "userId" INT NOT NULL REFERENCES users(id),
        "createdDate" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )`;


  const createTablesQueries = `${usersTable}; ${announcementsTable}`;

  pool
    .query(createTablesQueries)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};

export { dropTables, createTables, pool };

require('make-runnable');
