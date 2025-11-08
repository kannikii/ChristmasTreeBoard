require('dotenv').config();
const mysql = require('mysql2');

// .env의 DB 환경변수 불러오기
const connection = mysql.createConnection({
  host: process.env.DB_HOST,      // ex) localhost
  user: process.env.DB_USER,      // ex) root
  password: process.env.DB_PASSWORD, // ex) db_password
  database: process.env.DB_NAME,  // ex) christmas_db
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 연결 성공!');
});

module.exports = connection;
