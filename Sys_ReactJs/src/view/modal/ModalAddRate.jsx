import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ModalAddRate = ({ show, onHide, onSave, newRate, setNewRate, setCurrency, fromCurrencies }) => {
    const handleRateChange = (fromCurrency, rate) => {
        // Tạo đối tượng mới hoặc cập nhật đối tượng đã có
        const newRateObj = {
            fromCurrency,
            rate,
        };
        setNewRate([...newRate, newRateObj]);
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
                            value={newRate.toCurrency}
                            onChange={(e) =>
                                setCurrency(e.target.value)
                            }
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
                                    placeholder={`Rate for ${fromCurrency} to ${newRate.toCurrency}`}
                                    onChange={(e) =>
                                        handleRateChange(fromCurrency, e.target.value)
                                    }
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
                <Button variant="primary" onClick={onSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalAddRate;