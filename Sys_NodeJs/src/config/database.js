const mysql = require('mysql2/promise'); // Thêm `promise` để hỗ trợ async/await

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  // Tên người dùng MySQL
  database: 'soap', // Tên cơ sở dữ liệu
  waitForConnections: true,
  connectionLimit: 10,  // Số lượng kết nối tối đa
  queueLimit: 0,
});

// Xuất pool để dùng ở file khác
module.exports = pool;