import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ModalAddRate = ({
  show,
  onHide,
  onSave,
  newRate,
  setNewRate,
  setCurrency,
  fromCurrencies,
}) => {
  const [rateValues, setRateValues] = useState({});

  // Kiểm tra dữ liệu nhập hợp lệ với DECIMAL(20,10)
  const validateDecimal = (value) => {
    const regex = /^\d{1,20}(\.\d{1,10})?$/; // Tổng tối đa 20 chữ số, 10 chữ số thập phân
    return regex.test(value);
  };

  // Xử lý khi người dùng thay đổi giá trị rate
  const handleRateChange = (fromCurrency, rate) => {
    // Kiểm tra nếu không phải số hoặc nhỏ hơn 0
    if (isNaN(rate) || parseFloat(rate) < 0) {
      alert(
        `Invalid input for ${fromCurrency}. The value will be reset to 1.`
      );

      // Đặt giá trị thành 1 nếu không hợp lệ
      setRateValues((prevValues) => ({
        ...prevValues,
        [fromCurrency]: "1",
      }));

      // Cập nhật newRate với giá trị mặc định là 1
      const updatedRates = newRate.filter(
        (r) => r.fromCurrency !== fromCurrency
      );
      setNewRate([...updatedRates, { fromCurrency, rate: "1" }]);
      return;
    }

    // Cập nhật giá trị nếu hợp lệ
    setRateValues((prevValues) => ({
      ...prevValues,
      [fromCurrency]: rate,
    }));

    // Cập nhật newRate
    const updatedRates = newRate.filter((r) => r.fromCurrency !== fromCurrency);
    setNewRate([...updatedRates, { fromCurrency, rate }]);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Conversion Rates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>New Currency (To Currency)</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g., AUD"
              onChange={(e) => setCurrency(e.target.value)}
            />
          </Form.Group>
          <hr />
          <h5>Set Conversion Rates</h5>
          {fromCurrencies.map((fromCurrency, index) => (
            <Row key={index} className="align-items-center mb-2">
              <Col sm={4}>
                <Form.Label>{fromCurrency}</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  type="number"
                  step="any" // Cho phép nhập số thập phân
                  placeholder={`Rate for ${fromCurrency}`}
                  value={rateValues[fromCurrency] || ""}
                  onChange={(e) => handleRateChange(fromCurrency, e.target.value)}
                />
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            // Kiểm tra nếu tất cả rateValues hợp lệ trước khi lưu
            const allValid = Object.values(rateValues).every(validateDecimal);
            if (allValid) {
              onSave();
            } else {
              alert("Please fix invalid rates before saving.");
            }
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddRate;
