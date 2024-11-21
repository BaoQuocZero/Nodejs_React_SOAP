//homeController.js
const {
  selectSOAP,
  selectSOAP_from_currency,
  selectSOAP_to_currency,

  createSOAP,
  updateSOAP,
  deleteSOAP,
  deleteCurrencyRates
} = require('../services/SOAPSevices');

const getExchangeRates = async (req, res) => {
  try {
    const result = await selectSOAP();

    if (result.EC !== 1 || !Array.isArray(result.DT)) {
      return res.status(404).json({
        EM: result.EM || "Không tìm thấy dữ liệu",
        EC: result.EC,
        DT: [],
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi trong controller getExchangeRates:", error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy dữ liệu tỷ giá",
      EC: -1,
      DT: [],
    });
  }
};

const getFrom_Currency = async (req, res) => {
  try {
    const result = await selectSOAP_from_currency();

    if (result.EC !== 1 || !Array.isArray(result.DT)) {
      return res.status(404).json({
        EM: result.EM || "Không tìm thấy dữ liệu",
        EC: result.EC,
        DT: [],
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi trong controller getExchangeRates:", error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy dữ liệu tỷ giá",
      EC: -1,
      DT: [],
    });
  }
};

const getTo_currency = async (req, res) => {
  try {
    const result = await selectSOAP_to_currency();

    if (result.EC !== 1 || !Array.isArray(result.DT)) {
      return res.status(404).json({
        EM: result.EM || "Không tìm thấy dữ liệu",
        EC: result.EC,
        DT: [],
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi trong controller getExchangeRates:", error);
    return res.status(500).json({
      EM: "Lỗi server khi lấy dữ liệu tỷ giá",
      EC: -1,
      DT: [],
    });
  }
};

const addExchangeRate = async (req, res) => {
  const { newRate, newCurrency } = req.body;  // Truy xuất newRate và newCurrency từ body

  console.log("req.body: ", req.body);  // Log tất cả dữ liệu gửi từ client
  console.log("newRate: ", newRate);   // Log giá trị newRate
  console.log("newCurrency: ", newCurrency);  // Log giá trị newCurrency

  try {
    // Gọi hàm createSOAP để thực hiện logic liên quan đến tỷ giá
    const result = await createSOAP(newRate, newCurrency);

    // Trả về kết quả cho client
    return res.status(201).json(result);
  } catch (error) {
    console.error('Lỗi trong controller addExchangeRate:', error);
    return res.status(500).json({
      EM: 'Lỗi server khi thêm tỷ giá',
      EC: -1,
      DT: [],
    });
  }
};

const updateExchangeRate = async (req, res) => {
  const { from_currency, to_currency, rate } = req.body;
  try {
    const result = await updateSOAP(from_currency, to_currency, rate);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Lỗi trong controller updateExchangeRate:', error);
    return res.status(500).json({
      EM: 'Lỗi server khi cập nhật tỷ giá',
      EC: -1,
      DT: [],
    });
  }
};

const deleteExchangeRate = async (req, res) => {
  const { from_currency } = req.body;
  try {
    const result = await deleteCurrencyRates(from_currency);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Lỗi trong controller deleteExchangeRate:', error);
    return res.status(500).json({
      EM: 'Lỗi server khi xóa tỷ giá',
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  getExchangeRates,
  getFrom_Currency,
  getTo_currency,

  addExchangeRate,
  updateExchangeRate,
  deleteExchangeRate,
};
