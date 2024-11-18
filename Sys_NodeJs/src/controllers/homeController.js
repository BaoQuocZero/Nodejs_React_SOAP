//homeController.js
const { selectSOAP, createSOAP, updateSOAP, deleteSOAP } = require('../services/SOAPSevices');

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

const addExchangeRate = async (req, res) => {
  const { from_currency, to_currency, rate } = req.body;
  if (!from_currency || !to_currency || !rate) {
    return res.status(400).json({
      EM: 'Vui lòng cung cấp đầy đủ thông tin từ_currency, to_currency, và rate',
      EC: 0,
      DT: [],
    });
  }

  try {
    const result = await createSOAP(from_currency, to_currency, rate);
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
  const { id } = req.params;
  const { from_currency, to_currency, rate } = req.body;

  if (!id || !from_currency || !to_currency || !rate) {
    return res.status(400).json({
      EM: 'Vui lòng cung cấp đầy đủ thông tin id, từ_currency, to_currency, và rate',
      EC: 0,
      DT: [],
    });
  }

  try {
    const result = await updateSOAP(id, from_currency, to_currency, rate);
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
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      EM: 'Vui lòng cung cấp id của tỷ giá cần xóa',
      EC: 0,
      DT: [],
    });
  }

  try {
    const result = await deleteSOAP(id);
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
  addExchangeRate,
  updateExchangeRate,
  deleteExchangeRate,
};
