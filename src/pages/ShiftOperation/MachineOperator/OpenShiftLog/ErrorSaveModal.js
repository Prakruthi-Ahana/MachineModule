import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
export default function ErrorSaveModal({errorSave,setErrorSave}) {

    const handleClose=()=>{
    setErrorSave(false);
    }
  return (
    <div>
      <Modal show={errorSave} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Error Report saved 
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" 
        >
           Ok
          </Button>
          {/* <Button variant="secondary" onClick={handleClose}>
            No
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
