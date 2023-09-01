import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export default function LoadProgramMaterialModal({setLoadProgram,loadProgram}) {
    const handleClose=()=>{
        setLoadProgram(false);
            }
  return (
    <div>
      <Modal show={ loadProgram} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do You wish to Load Material ID:23456
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
