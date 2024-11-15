const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const app = express();

const SOAPRouter = require('./routes/SOAPRouter')

// Sử dụng middleware CORS để cho phép yêu cầu từ http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.raw({ type: () => true, limit: '5mb' }));

SOAPRouter(app);

const service = {
  CurrencyConverterService: {
    CurrencyConverterPort: {

      ConvertCurrency: function (args) {
        const { amount, fromCurrency, toCurrency, conversionRates } = args;
      
        // Parse JSON nếu conversionRates là chuỗi
        let rates;
        try {
          rates = typeof conversionRates === "string" ? JSON.parse(conversionRates) : conversionRates;
        } catch (error) {
          console.error("Failed to parse conversionRates:", error);
          return { result: "0.00" }; // Trả về 0 nếu lỗi
        }
      
        // Kiểm tra nếu rates không được cung cấp
        if (!rates || typeof rates !== "object") {
          return { result: "0.00" };
        }
      
        // Kiểm tra nếu amount hợp lệ
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
          return { result: "0.00" }; // Trả về 0 nếu amount không hợp lệ
        }
      
        // Lấy tỷ giá
        let result = 0;
        if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
          result = parsedAmount * rates[fromCurrency][toCurrency];
        } else {
          return { result: "0.00" }; // Trả về 0 nếu không tìm thấy tỷ giá
        }
      
        return {
          result: result.toFixed(2),
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