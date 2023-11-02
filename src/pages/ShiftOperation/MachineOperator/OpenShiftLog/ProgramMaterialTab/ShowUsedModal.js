import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


export default function ShowUsedModal({showusedModal,setShowusedModal, filterUnusedData }) {
    const handleClose=()=>{
        setShowusedModal(false);
             }

             const handleOkClick = () => {
               filterUnusedData();
               setShowusedModal(false);
           }
  return (
    <div>
    <Modal show={showusedModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>magod_machine</Modal.Title>
    </Modal.Header>

    <Modal.Body>Used
     </Modal.Body> 

    <Modal.Footer>
      <Button variant="primary" onClick={handleOkClick}
    >
        Yes
      </Button>
    
    </Modal.Footer>
  </Modal>
 

    </div>
  )
}
