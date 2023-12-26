import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import ReasonForRejectModal from './ReasonForRejectModal';
import axios from 'axios';
import{baseURL} from '../../../../../../api/baseUrl';
import { toast } from "react-toastify";

export default function MarkasUsedModal({setMarkasUsed,markasUsed, handleMarkasUsed,selectProductionReportData,setProductionReportData}) {
    const [reasonForReject, setReasonForReject]=useState(false);

    const handleClose=()=>{
      setMarkasUsed(false);
            }

            const reasonSubmit=()=>{
              setMarkasUsed(false);
                handleMarkasUsed();
                axios
                .post(baseURL + "/ShiftOperator/MachineTasksProfile", {
                  NCId: selectProductionReportData,
                })
                .then((response) => {
                  console.log(response);
                  toast.success("success", {
                    position: toast.POSITION.TOP_CENTER,
                  });
                  setProductionReportData(response.data);
                });
            }
  return (
    <div>
      <Modal show={markasUsed} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>Material once Marked as Used cannot be used again.
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
   
        <ReasonForRejectModal 
        reasonForReject={reasonForReject} setReasonForReject={setReasonForReject}/>
    </div>
  );
}
