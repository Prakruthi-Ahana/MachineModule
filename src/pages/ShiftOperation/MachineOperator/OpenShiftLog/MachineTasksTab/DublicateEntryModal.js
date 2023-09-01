import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

export default function DublicateEntryModal({setDublicateEntry,dublicateEntry}) {
    const handleClose=()=>{
setDublicateEntry(false);
    }

  return (
    <div>
      <Modal show={dublicateEntry} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Dublicate Entry '13002-6' for key 2 
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
