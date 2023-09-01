import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export default function ProgramCompleteModal({setProgramComplete,programComplete}) {
    const handleClose=()=>{
        setProgramComplete(false);
    }
  return (
    <div>
      <Modal show={programComplete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do you want to change status of program to completed 
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
