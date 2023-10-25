import React from 'react'
import { Modal, Button } from 'react-bootstrap';

export default function GlobalModal({ show, title, content, onYesClick, onNoClick, onClose }) {
  return (
    <div>
          <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={onYesClick}>
                Yes
              </Button>
              <Button variant="secondary" onClick={onNoClick}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
    </div>
  )
}
