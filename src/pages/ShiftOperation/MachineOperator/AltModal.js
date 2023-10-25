import React from "react";
import { Modal, Button } from 'react-bootstrap';

export default function AltModal({
  show,
  data, 
  onYesClick,
  onNoClick,
  onClose,
})

{
  const handleYesClick = () => {
    onYesClick(); // Call the provided onYesClick function
  }

  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title> 
        </Modal.Header>
        <Modal.Body>{data.content}</Modal.Body> 
        <Modal.Footer>
          <Button variant="primary" onClick={handleYesClick}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
