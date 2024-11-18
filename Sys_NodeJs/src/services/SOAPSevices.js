// SOAPSevices.js
const pool = require("../config/database");

const selectSOAP = async () => {
  try {
    const [results] = await pool.execute(`SELECT * FROM exchange_rates`);

    if (!results || results.length === 0) {
      return {
        EM: "Không có dữ liệu",
        EC: 0,
        DT: [],
      };
    }

    return {
      EM: "Xem thành công",
      EC: 1,
      DT: results,
    };
  } catch (error) {
    console.error("Lỗi trong selectSOAP:", error);
    return {
      EM: "Lỗi services selectSOAP",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = selectSOAP;




const createSOAP = async (from_currency, to_currency, rate) => {
  try {
    let [result] = await pool.execute(
      `INSERT INTO exchange_rates (from_currency, to_currency, rate) VALUES (?, ?, ?)`,
      [from_currency, to_currency, rate]
    );
    return {
      EM: "Thêm thành công",
      EC: 1,
      DT: result,
    };
  } catch (error) {
    return {
      EM: "Lỗi khi thêm tỷ giá",
      EC: -1,
      DT: [],
    };
  }
};

const updateSOAP = async (id, from_currency, to_currency, rate) => {
  try {
    let [result] = await pool.execute(
      `UPDATE exchange_rates SET from_currency = ?, to_currency = ?, rate = ? WHERE id = ?`,
      [from_currency, to_currency, rate, id]
    );
    if (result.affectedRows === 0) {
      return {
        EM: "Không tìm thấy bản ghi để cập nhật",
        EC: 0,
        DT: [],
      };
    }
    return {
      EM: "Cập nhật thành công",
      EC: 1,
      DT: result,
    };
  } catch (error) {
    return {
      EM: "Lỗi khi cập nhật tỷ giá",
      EC: -1,
      DT: [],
    };
  }
};

const deleteSOAP = async (id) => {
  try {
    let [result] = await pool.execute(
      `DELETE FROM exchange_rates WHERE id = ?`,
      [id]
    );
    if (result.affectedRows === 0) {
      return {
        EM: "Không tìm thấy bản ghi để xóa",
        EC: 0,
        DT: [],
      };
    }
    return {
      EM: "Xóa thành công",
      EC: 1,
      DT: result,
    };
  } catch (error) {
    return {
      EM: "Lỗi khi xóa tỷ giá",
      EC: -1,
      DT: [],
    };
  }
};

module.exports = {
  selectSOAP,
  createSOAP,
  updateSOAP,
  deleteSOAP
};