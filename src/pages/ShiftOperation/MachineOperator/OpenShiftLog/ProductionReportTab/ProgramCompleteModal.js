import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { baseURL } from '../../../../../api/baseUrl';

export default function ProgramCompleteModal({setProgramComplete,programComplete,selectProductionReport}) {
    const handleClose=()=>{
        setProgramComplete(false);
    }

    const onClickYes=()=>{
      // console.log(selectProductionReport);
      axios
      .post(baseURL + "/ShiftOperator/programCompleted", {
        selectProductionReport
      })
      .then((response) => {
        setProgramComplete(false);
        toast.success('Data Saved Successfully', {
          position: toast.POSITION.TOP_CENTER
        });
      });
    }

  return (
    <div>
      <Modal show={programComplete} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Do you want to change status of program to completed ?
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
  );
}
