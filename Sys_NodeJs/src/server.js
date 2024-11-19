//server.js
const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const app = express();
// Middleware để phân tích JSON
app.use(express.json());

const SOAPRouter = require('./routes/SOAPRouter')

// Sử dụng middleware CORS để cho phép yêu cầu từ http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));
SOAPRouter(app);

const service = {
  CurrencyConverterService: {
    CurrencyConverterPort: {

      ConvertCurrency: function (args) {
        const { amount, conversionRate } = args;

        // Kiểm tra nếu conversionRate hợp lệ
        const parsedRate = parseFloat(conversionRate);
        if (isNaN(parsedRate) || parsedRate <= 0) {
          console.error("Invalid conversion rate:", conversionRate);
          return { result: "0.00" }; // Trả về 0 nếu tỷ giá không hợp lệ
        }

        // Kiểm tra nếu amount hợp lệ
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
          console.error("Invalid amount:", amount);
          return { result: "0.00" }; // Trả về 0 nếu amount không hợp lệ
        }

        // Tính kết quả
        const result = parsedAmount * parsedRate;

        return {
          result: result.toFixed(2), // Định dạng kết quả với 2 chữ số thập phân
        };
      },
    }
  }
};

const xml = fs.readFileSync('currencyConverter.wsdl', 'utf8');

soap.listen(app, '/wsdl', service, xml);

const PORT = 8000;
http.createServer(app).listen(PORT, () => {
  console.log(`SOAP server is running on http://localhost:${PORT}/wsdl`);
});