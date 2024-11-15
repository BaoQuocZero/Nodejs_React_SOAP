const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Thay bằng tên người dùng MySQL của bạn nếu có
  database: 'soap'  // Thay 'database_name' bằng tên cơ sở dữ liệu của bạn
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối MySQL:', err);
  } else {
    console.log('Đã kết nối MySQL thành công.');
  }
});

// Xuất kết nối để có thể sử dụng ở các file khác
module.exports = connection;