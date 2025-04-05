require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true 
  }
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar no TiDB:', err.message);
  } else {
    console.log('✅ Conectado ao TiDB com sucesso!');
  }
});

module.exports = connection;