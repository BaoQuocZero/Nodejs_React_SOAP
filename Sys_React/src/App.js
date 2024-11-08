import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:8000/wsdl', soapRequest, {
        headers: {
          'Content-Type': 'text/xml',
        },
      });
  
      // Kiểm tra xem phản hồi có phải là XML hợp lệ không
      console.log("response.data: ", response.data);
      if (response.data.startsWith('<?xml')) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        
        // Trích xuất giá trị result từ thẻ <tns:ConvertCurrencyResponse>
        const resultValue = xmlDoc.getElementsByTagName('tns:result')[0]?.textContent;
        
        if (resultValue) {
          setResult(resultValue);  // Lưu kết quả vào state
        } else {
          console.log('No result in SOAP response');
        }
      } else {
        console.error('Invalid SOAP response:', response.data);
      }

      console.log("result: ", result);
    } catch (error) {
      console.log('Error calling SOAP API:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Currency Converter (SOAP API)</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <span> to </span>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <button onClick={convertCurrency}>Convert</button>
      {result && <h3>Result: {result}</h3>}
    </div>
  );
}

export default App;