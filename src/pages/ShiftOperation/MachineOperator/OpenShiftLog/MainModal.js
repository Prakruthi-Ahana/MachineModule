import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export default function MainModal({setOpenModal,openModal}) {
    
    const handleClose=()=>{
        setOpenModal(false);
    }
  return (
    <div>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Is Program 415706 running from the begining of this shift? 
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" 
        >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
