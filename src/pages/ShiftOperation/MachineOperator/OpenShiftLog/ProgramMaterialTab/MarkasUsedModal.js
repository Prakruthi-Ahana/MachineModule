import React from 'react';

export default function MarkasUsedModal() {
    const handleClose=()=>{

    }
  return (
    <div>
       <Modal show={ m} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do You Wish Mark 10 as used ?
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" 
        >
           Ok
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
