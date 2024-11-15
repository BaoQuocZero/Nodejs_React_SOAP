import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);

  const convertCurrency = async () => {
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:tns="http://www.example.org/currencyConverter/">
        <soapenv:Header/>
        <soapenv:Body>
          <tns:ConvertCurrency>
            <tns:amount>${amount}</tns:amount>
            <tns:fromCurrency>${fromCurrency}</tns:fromCurrency>
            <tns:toCurrency>${toCurrency}</tns:toCurrency>
          </tns:ConvertCurrency>
        </soapenv:Body>
      </soapenv:Envelope>
    `;

    try {
      if (!amount || amount === 0 || amount === "") {
        setResult("Dữ liệu không hợp lệ !");
        return;
      }

      if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
        setResult(amount);
        return;
      }

      const response = await axios.post('http://localhost:8000/wsdl', soapRequest, {
        headers: {
          'Content-Type': 'text/xml',
        },
      });

      if (response.data.startsWith('<?xml')) {
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
          console.log('No result in SOAP response');
        }
      } else {
        console.error('Invalid SOAP response:', response.data);
      }
    } catch (error) {
      console.log('Error calling SOAP API:', error);
    }
  };

  useEffect(() => {
    if (amount) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]); // Chạy lại khi amount, fromCurrency hoặc toCurrency thay đổi

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

        {result && amount && (
          <div className="alert alert-success text-center mt-4" role="alert">
            Result: {amount} {fromCurrency} = {result} {toCurrency}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;