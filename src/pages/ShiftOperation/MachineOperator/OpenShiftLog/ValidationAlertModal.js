
import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useNavigate} from 'react-router-dom'

export default function ValidationAlertModal({openalert,setOpenAlert}) {
  
    const handleClose=()=>{
        setOpenAlert(true);
    }

  return (
    <div>
         <Modal show={openalert} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Error No, Error Description  are mandatory fields
        </Modal.Body> 

        <Modal.Footer>
          <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={handleClose} >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
