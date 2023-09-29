import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from '../../../../api/baseUrl';

export default function StoppageAskModal({setAlreadyLoad, alreadyLoad,selectedStoppageID,selectshifttable,selectedStoppage}) {
    const handleClose=()=>{
        setAlreadyLoad(false);
    }

    const onClickYes = () => {
      axios
        .post(baseURL + "/ShiftOperator/addStopage", {
          selectshifttable:selectshifttable,
          selectedStoppageID:selectedStoppageID,
          selectedStoppage:selectedStoppage
        })
        .then((response) => {
          console.log(response.data);
          handleClose();
        });
    };

    
  return (
    <div>
       <Modal show={alreadyLoad} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do you wish to stop the cutting for <b>{selectedStoppage}</b> ?
         </Modal.Body> 

        <Modal.Footer>
          <Button variant="primary" 
          onClick={onClickYes}
        >
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

