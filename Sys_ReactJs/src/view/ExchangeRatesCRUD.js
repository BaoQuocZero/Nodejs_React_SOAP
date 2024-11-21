import React, { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';

import ModalAddRate from "./modal/ModalAddRate";
import ModalUpdateRate from "./modal/ModalUpdateRate";

const ExchangeRatesCRUD = () => {
  const serverUrl = 'http://localhost:8000/api/v1/SOAP';

  const [ConversionRates, setConversionRates] = useState([]);

  const [showModal, setShowModal] = useState(false); //Đóng mở modal
  const [newRate, setNewRate] = useState([]);
  const [newCurrency, setCurrency] = useState("");

  const [from_currency, setFrom_currency] = useState([]);
  const [to_Currency, setTo_Currency] = useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editingData, setEditingData] = useState(null);

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

  const fetchFrom_Currency = async () => {
    try {
      const response = await axios.get(`${serverUrl}/xem/from_currency`);
      setFrom_currency(response.data.DT);
      console.log("from_currency: ", from_currency)
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
      console.log("to_Currency: ", to_Currency)
      return response.data;
    } catch (error) {
      console.error("Error fetching conversion rates:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchConversionRates();
    fetchFrom_Currency()
    fetchTo_currency()
  }, []); // Chỉ gọi fetchConversionRates khi component mount

  const addNewRate = async () => {
    try {
      setShowModal(false)
      console.log("newRate: ", newRate)
      console.log("newCurrency: ", newCurrency)
      await axios.post(`${serverUrl}/tao`, { newRate, newCurrency });
      fetchConversionRates();
      fetchFrom_Currency()
      fetchTo_currency()

    } catch (error) {
      console.error("Error adding new rates:", error);
    }
  };

  // Edit row
  const handleAdd = (index) => {
    fetchConversionRates();
    fetchFrom_Currency()
    fetchTo_currency()
    setShowModal(true)
  };

  // Edit row
  const handleEdit = (index) => {
    const rowData = ConversionRates[index];
    setEditingData(rowData);
    setShowUpdateModal(true);
  };

  const updateRate = async (updatedData) => {
    try {
      console.log("updatedData: ", updatedData)
      setShowUpdateModal(false);
      await axios.post(`${serverUrl}/sua`, updatedData); // Gửi API cập nhật
      fetchConversionRates(); // Tải lại danh sách
    } catch (error) {
      console.error("Error updating rate:", error);
    }
  };

  // Delete row
  const handleDelete = async (currency) => {
    const confirmed = window.confirm("Are you sure you want to delete this rate?");
    if (confirmed) {
      try {
        console.log("currency: ", currency);
        // Gửi API xóa
        await axios.post(`${serverUrl}/xoa`, { from_currency: currency }); // Truyền đúng tham số cho API
        fetchConversionRates(); // Tải lại danh sách
      } catch (error) {
        console.error("Error deleting rate:", error);
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Exchange Rates CRUD</h2>
      {/* Add New Rate Button */}
      <div className="d-flex justify-content-between mb-4">
        <Link to="/home" className="btn btn-primary">Home</Link>
        <button className="btn btn-success" onClick={() => handleAdd()}>
          Add New Conversion Rate
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>From Currency</th>
            <th>To Currency</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ConversionRates.map((row, index) => (
            <tr key={index}>
              <td>{row.from_currency}</td>
              <td>{row.to_currency}</td>
              <td>{row.rate}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(row.from_currency)} // Truyền row.from_currency
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ModalAddRate */}
      <ModalAddRate
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={addNewRate}
        newRate={newRate}
        setNewRate={setNewRate}
        setCurrency={setCurrency}
        fromCurrencies={from_currency.map(item => item.from_currency)} // Truyền danh sách from_currency
      />

      <ModalUpdateRate
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        onSave={updateRate}
        editingData={editingData}
      />
    </div>
  );
};

export default ExchangeRatesCRUD;