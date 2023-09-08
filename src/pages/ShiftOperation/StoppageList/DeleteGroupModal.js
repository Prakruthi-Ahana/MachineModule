import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function DeleteGroupModal({ show, handleClose, data,handleGroup }) {
  const handleYesClick = () => {
    handleGroup(data);
  
  };
  return (
    <div>
         <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{data.content}</p>
      </Modal.Body>
      <Modal.Footer>
      <Button variant='primary' onClick={handleYesClick}>Yes</Button>
            <Button variant='secondary' onClick={handleClose}>No</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
