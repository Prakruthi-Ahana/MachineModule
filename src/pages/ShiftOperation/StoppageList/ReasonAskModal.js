import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ReasonAskModal({ show, handleClose,handleadd, reason,selectedGroup}) {
  // console.log(selectedGroup)
  return (
    <div>
         <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Reason</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
      Are you sure you want to add <strong>{reason}</strong> as Reason for  <b>{selectedGroup.GroupName}</b>?
    </div>
      </Modal.Body>
      <Modal.Footer>
      <Button variant='primary' onClick={() =>handleadd()} >Yes</Button>  
            <Button variant='secondary' onClick={handleClose}>No</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
