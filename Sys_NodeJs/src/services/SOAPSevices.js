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

const selectSOAP_from_currency = async () => {
  try {
    const [results] = await pool.execute(`SELECT e.from_currency FROM exchange_rates e GROUP BY e.from_currency`);

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

const selectSOAP_to_currency = async () => {
  try {
    const [results] = await pool.execute(`SELECT e.to_currency FROM exchange_rates e GROUP BY e.to_currency`);

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

const createSOAP = async (newRate, newCurrency) => {
  try {
    // Sử dụng vòng lặp for...of để xử lý các thao tác bất đồng bộ
    for (let item of newRate) {
      if (item.rate !== '') {
        // Câu lệnh INSERT để thêm vào bảng exchange_rates
        await pool.execute(`
          INSERT INTO exchange_rates (from_currency, to_currency, rate) 
          VALUES (?, ?, ?)`, [item.fromCurrency, newCurrency, item.rate]);

        // Câu lệnh INSERT để thêm ngược lại tỷ giá đổi
        await pool.execute(`
          INSERT INTO exchange_rates (from_currency, to_currency, rate) 
          VALUES (?, ?, ?)`, [newCurrency, item.fromCurrency, (1 / item.rate)]);
      }
    }

    // Trả về thông báo thành công
    return {
      EM: "Thêm thành công",
      EC: 1,
      DT: [],
    };
  } catch (error) {
    console.error("Lỗi khi thêm tỷ giá:", error);
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
  selectSOAP_from_currency,
  selectSOAP_to_currency,

  createSOAP,
  updateSOAP,
  deleteSOAP
};