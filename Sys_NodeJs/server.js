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
        const conversionRates = {
          USD: { EUR: 0.85 },
          EUR: { USD: 1.18 }
        };

        let result = 0;
        if (conversionRates[fromCurrency] && conversionRates[fromCurrency][toCurrency]) {
          result = parseFloat(amount) * conversionRates[fromCurrency][toCurrency];
        }

        return {
          result: result.toFixed(2)
        };
      }
    }
  }
};

// Đọc WSDL từ file (trong trường hợp này sẽ là file currencyConverter.wsdl)
const xml = fs.readFileSync('currencyConverter.wsdl', 'utf8');

// Sử dụng soap.listen để tạo SOAP service tại /wsdl
soap.listen(app, '/wsdl', service, xml);

// Khởi chạy server
const PORT = 8000;
http.createServer(app).listen(PORT, () => {
  console.log(`SOAP server is running on http://localhost:${PORT}/wsdl`);
});
