import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Home() {
  const [amount, setAmount] = useState("");
  const [ConversionRates, setConversionRates] = useState([]);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const [from_currency, setFrom_currency] = useState([]);
  const [to_Currency, setTo_Currency] = useState([]);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  const serverUrl = "http://localhost:8000/api/v1/SOAP";

  const fetchConversionRates = async () => {
    try {
      const response = await axios.get(`${serverUrl}/xem`);
      setConversionRates(response.data.DT);
      console.log("ConversionRates: ", ConversionRates);
      return response.data;
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      return null;
    }
  };

  const fetchFrom_Currency = async () => {
    try {
      const response = await axios.get(`${serverUrl}/xem/from_currency`);
      setFrom_currency(response.data.DT);
      console.log("from_currency: ", from_currency);
      return response.data;
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      return null;
    }
  };

  const fetchTo_currency = async () => {
    try {
      const response = await axios.get(`${serverUrl}/xem/to_currency`);
      setTo_Currency(response.data.DT);
      console.log("to_Currency: ", to_Currency);
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
        setError("Please enter a valid amount greater than 0.");
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
        setError(
          `No conversion rate available for ${fromCurrency} to ${toCurrency}.`
        );
        setLoading(false);
        return;
      }

      console.log("conversionRate.rate: ", conversionRate.rate);
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

      const response = await axios.post(
        "http://localhost:8000/wsdl",
        soapRequest,
        {
          headers: { "Content-Type": "text/xml" },
        }
      );

      // Xử lý phản hồi từ backend
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
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
        setError("Failed to get a valid response from the server.");
      }
    } catch (error) {
      setError("Error communicating with the server.");
      console.error("SOAP API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversionRates();
    fetchFrom_Currency();
    fetchTo_currency();
  }, []); // Chỉ gọi fetchConversionRates khi component mount

  useEffect(() => {
    if (amount && ConversionRates.length > 0) {
      convertCurrency();
      fetchFrom_Currency();
      fetchTo_currency();
    }
  }, [amount, fromCurrency, toCurrency, ConversionRates]);

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="text-center mb-4">Currency Converter (SOAP API)</h2>

        {/* Form */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              min="0" // Đặt giá trị tối thiểu là 0
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {from_currency.length > 0 ? (
                from_currency.map((item, index) => (
                  <option key={index} value={item.from_currency}>
                    {item.from_currency}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
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
              {to_Currency.length > 0 ? (
                to_Currency.map((item, index) => (
                  <option key={index} value={item.to_currency}>
                    {item.to_currency}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>
          </div>
        </div>

        {/* Result */}
        {result && !loading && !error ? (
          <div className="alert alert-success text-center mt-4" role="alert">
            {amount} {fromCurrency} = {result} {toCurrency}
          </div>
        ) : (
          <div className="alert alert-warning text-center mt-4" role="alert">
            {error? error : "N/A"}
          </div>
        )}

        {/* Add New Rate Button */}
        <div className="text-center mt-4 d-none">
          <Link to="/ExchangeRatesCRUD" className="btn btn-primary">
            Exchange Rates CRUD
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
