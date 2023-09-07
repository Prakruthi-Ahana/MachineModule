import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function DeleteAskModal({ show, handleClose, data,handleDelete }) {
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
      <Button variant='primary' onClick={() => handleDelete(data)}>Yes</Button>  
            <Button variant='secondary' onClick={handleClose}>No</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
