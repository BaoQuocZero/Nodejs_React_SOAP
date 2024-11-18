import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [amount, setAmount] = useState('');
  const [ConversionRates, setConversionRates] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  const serverUrl = 'http://localhost:8000/api/v1/SOAP';

  const fetchConversionRates = async () => {
    try {
      const response = await axios.get(`${serverUrl}/xem`);
      setConversionRates(response.data.DT);
      console.log("ConversionRates: ", ConversionRates)
      return response.data;
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      return null;
    }
  };

  const convertCurrency = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!amount || parseFloat(amount) <= 0) {
        setError('Please enter a valid amount greater than 0.');
        setLoading(false);
        return;
      }

      if (fromCurrency === toCurrency) {
        setResult(amount);
        setLoading(false);
        return;
      }

      // Tìm tỷ lệ chuyển đổi từ ConversionRates
      const conversionRate = ConversionRates.find(
        (rate) =>
          rate.from_currency === fromCurrency && rate.to_currency === toCurrency
      );

      if (!conversionRate) {
        setError(`No conversion rate available for ${fromCurrency} to ${toCurrency}.`);
        setLoading(false);
        return;
      }

      console.log("conversionRate.rate: ", conversionRate.rate)
      // Gửi request tới backend
      const soapRequest = `
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                          xmlns:tns="http://www.example.org/currencyConverter/">
          <soapenv:Header/>
          <soapenv:Body>
            <tns:ConvertCurrency>
              <tns:amount>${amount}</tns:amount>
              <tns:conversionRate>${conversionRate.rate}</tns:conversionRate>
            </tns:ConvertCurrency>
          </soapenv:Body>
        </soapenv:Envelope>
      `;

      const response = await axios.post('http://localhost:8000/wsdl', soapRequest, {
        headers: { 'Content-Type': 'text/xml' },
      });

      // Xử lý phản hồi từ backend
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const resultNode = xmlDoc.evaluate(
        "//*[local-name()='result']",
        xmlDoc,
        null,
        XPathResult.STRING_TYPE,
        null
      );

      const resultValue = resultNode.stringValue;
      if (resultValue) {
        setResult(resultValue);
      } else {
        setError('Failed to get a valid response from the server.');
      }
    } catch (error) {
      setError('Error communicating with the server.');
      console.error('SOAP API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversionRates();
  }, []); // Chỉ gọi fetchConversionRates khi component mount

  useEffect(() => {
    if (amount && ConversionRates.length > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, ConversionRates]);


  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Currency Converter (SOAP API)</h2>

        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
          <div className="col-md-1 text-center">
            <span>to</span>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="alert alert-info text-center mt-4" role="alert">
            Converting...
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center mt-4" role="alert">
            {error}
          </div>
        )}

        {result && !loading && !error && (
          <div className="alert alert-success text-center mt-4" role="alert">
            Result: {amount} {fromCurrency} = {result} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;