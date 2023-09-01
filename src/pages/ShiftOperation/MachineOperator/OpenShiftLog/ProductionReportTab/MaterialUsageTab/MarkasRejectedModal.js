import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ReasonForRejectModal from './ReasonForRejectModal';

export default function MarkasRejectedModal({setMarkasRejected,markasRejected}) {
    const [reasonForReject, setReasonForReject]=useState(false);

    const handleClose=()=>{
        setMarkasRejected(false);
            }

            const reasonSubmit=()=>{
                setReasonForReject(true);
                setMarkasRejected(false);

            }
  return (
    <div>
      <Modal show={markasRejected} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Material once Marked as Rejected cannot br used again.
             Are you sure?
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" onClick={reasonSubmit}
        >
           Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {
        reasonForReject &&
        <ReasonForRejectModal 
        reasonForReject={reasonForReject} setReasonForReject={setReasonForReject}/>
      }
    </div>
  );
}
