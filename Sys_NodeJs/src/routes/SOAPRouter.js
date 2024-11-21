//SOAPRouter.js
const express = require("express");
const router = express.Router();

const {
  getExchangeRates,
  getFrom_Currency,
  getTo_currency,

  addExchangeRate,
  updateExchangeRate,
  deleteExchangeRate,
} = require("../controllers/homeController"); // Đảm bảo đường dẫn đến controller chính xác

const SOAPRouter = (app) => {
  // Middleware để xử lý dữ liệu JSON
  app.use(express.json());
  // Route để lấy danh sách tỷ giá
  router.get("/xem", getExchangeRates);

  router.get("/xem/from_currency", getFrom_Currency);

  router.get("/xem/to_currency", getTo_currency);

  // Route để tạo mới tỷ giá
  router.post("/tao", addExchangeRate);

  // Route để cập nhật tỷ giá theo ID
  router.post("/sua", updateExchangeRate);

  // Route để xóa tỷ giá theo ID
  router.post("/xoa", deleteExchangeRate);

  // Gắn các route vào ứng dụng chính với tiền tố '/api/v1/SOAP'
  return app.use("/api/v1/SOAP", router);
};

module.exports = SOAPRouter;