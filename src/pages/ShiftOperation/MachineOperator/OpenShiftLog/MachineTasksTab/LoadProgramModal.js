import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import DublicateEntryModal from './DublicateEntryModal';

export default function LoadProgramModal({open, setOpen,NCProgramNo,afterLoadProgram, showTable}) {

const handleSubmit = () => {
  afterLoadProgram(); 
  setOpen(false);
  showTable(true)
}
const handleClose=()=>{
        setOpen(false);
    }
  return (
    <div>
      <Modal show={open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do you wish to load NC Program No: <b>{NCProgramNo}</b> ?
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary"  onClick={handleSubmit}
        >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {
        dublicateEntry &&
        <DublicateEntryModal  
        dublicateEntry={ dublicateEntry} setDublicateEntry={setDublicateEntry} />
      } */}

    </div>
  );
}
