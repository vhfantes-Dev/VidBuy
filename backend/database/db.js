const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: 'vidbuy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('✅ Conectado ao banco de dados MySQL com sucesso!');
      connection.release();
    } catch (error) {
      console.error('❌ Erro ao conectar no banco de dados:', error.message);
    }
  })();
module.exports = pool;