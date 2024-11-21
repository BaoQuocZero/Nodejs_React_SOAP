import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalUpdateRate = ({ show, onHide, onSave, editingData }) => {
    const [updatedRate, setUpdatedRate] = useState(editingData?.rate || "");
    const [updatedCurrency, setUpdatedCurrency] = useState(editingData?.to_currency || "");

    useEffect(() => {
        if (editingData) {
            setUpdatedRate(editingData.rate);
            setUpdatedCurrency(editingData.to_currency);
        }
    }, [editingData]);

    const handleSave = () => {
        onSave({ ...editingData, rate: updatedRate, to_currency: updatedCurrency });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Conversion Rate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>From Currency (Read Only)</Form.Label>
                        <Form.Control type="text" value={editingData?.from_currency} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>To Currency (Read Only)</Form.Label>
                        <Form.Control type="text" value={editingData?.to_currency} readOnly />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rate</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            value={updatedRate}
                            onChange={(e) => setUpdatedRate(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalUpdateRate;