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
export default {
  async query(text, params) {
    const result = await pool.query(text, params);
    return result;
  },
};
