const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fs = require('fs');

const app = express();

// Sử dụng middleware CORS để cho phép yêu cầu từ http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));

const service = {
  CurrencyConverterService: {
    CurrencyConverterPort: {

      ConvertCurrency: function (args) {
        const { amount, fromCurrency, toCurrency } = args;
      
        // Kiểm tra nếu amount hợp lệ
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
          return { result: '-0.00' }; // Trả về 0 nếu amount không hợp lệ
        }
      
        // Bảng tỷ giá cập nhật với các loại tiền tệ khác nhau
        const conversionRates = {
          USD: { EUR: 0.85, GBP: 0.74, JPY: 150.0, AUD: 1.35 },
          EUR: { USD: 1.18, GBP: 0.87, JPY: 176.0, AUD: 1.59 },
          GBP: { USD: 1.35, EUR: 1.15, JPY: 202.0, AUD: 1.83 },
          JPY: { USD: 0.0067, EUR: 0.0057, GBP: 0.0049, AUD: 0.0091 },
          AUD: { USD: 0.74, EUR: 0.63, GBP: 0.55, JPY: 110.0 }
        };
      
        let result = 0;
        if (
          conversionRates[fromCurrency] &&
          conversionRates[fromCurrency][toCurrency]
        ) {
          result = parsedAmount * conversionRates[fromCurrency][toCurrency];
        } else {
          return { result: '0.00' }; // Trả về 0 nếu không tìm thấy tỷ giá
        }
      
        return {
          result: result.toFixed(2)
        };
      }
      
    }
  }
};

const xml = fs.readFileSync('currencyConverter.wsdl', 'utf8');

soap.listen(app, '/wsdl', service, xml);

const PORT = 8000;
http.createServer(app).listen(PORT, () => {
  console.log(`SOAP server is running on http://localhost:${PORT}/wsdl`);
});