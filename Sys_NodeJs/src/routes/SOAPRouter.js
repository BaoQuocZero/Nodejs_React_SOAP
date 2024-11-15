const express = require("express");
const router = express.Router();

const {
  getExchangeRates,
  addExchangeRate,
  updateExchangeRate,
  deleteExchangeRate,
} = require("../controllers/homeController"); // Đảm bảo đường dẫn đến controller chính xác

const SOAPRouter = (app) => {
  // Route để lấy danh sách tỷ giá
  router.get("/xem", getExchangeRates);

  // Route để tạo mới tỷ giá
  router.post("/tao", addExchangeRate);

  // Route để cập nhật tỷ giá theo ID
  router.put("/sua/:id", updateExchangeRate);

  // Route để xóa tỷ giá theo ID
  router.delete("/xoa/:id", deleteExchangeRate);

  // Gắn các route vào ứng dụng chính với tiền tố '/api/v1/SOAP'
  return app.use("/api/v1/SOAP", router);
};

module.exports = SOAPRouter;