import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ReasonAskModal from './ReasonAskModal';

  export default function AddReason({ openAddReason, setOpenAddReason, selectedGroup, setGetReasonsList }) {
  const handleClose = () => {
    setOpenAddReason(false);
  }

  const [openreasonModal, setOpenreasonModal] = useState(false);
  
  const handleModal = () => {
    if(reason.trim() === ''){
      toast.error("Reason cannot be empty", {
        position: toast.POSITION.TOP_CENTER,
      })
    setOpenreasonModal(false);
    }else{
      setOpenreasonModal(true)
    }
  }

  const newHandleClose = () => {
    setOpenreasonModal(false);
  }

  const [reason, setReason] = useState('')
  const handlereason = (event) => {
    setReason(event.target.value)
  }

  
  const addReason = async () => {
    try {
      // First API call
      const response1 = await axios.post(
        "http://172.16.20.61:5006/reports/addReason",
        { Reason: reason, GroupId: selectedGroup.StoppageGpId }
      );
      console.log(response1.data);
      setOpenreasonModal(false);
      handleClose();
      toast.success("Reason added successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      // Introduce a delay of 1000 milliseconds (1 second)
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Second API call after the delay
      const response2 = await axios.post(
        "http://172.16.20.61:5006/reports/getReason",
        {
          StoppageGpId: selectedGroup?.StoppageGpId
        }
      );
      console.log(response2.data);
      setGetReasonsList(response2.data);
      setReason('');
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };
  

  return (
    <Modal show={openAddReason} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Magod Laser:Add Reason</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {openreasonModal ? null : (
          <div className="col-md-12 col-sm-12 ip-box form-bg">
            <div>
              <div className="row">
                <div className="col-md-12">
                  <label className="form-label">Group Name</label>
                  <input
                    className="in-field"
                    value={selectedGroup.GroupName}
                    disabled
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <label className="form-label">Reason</label>
                  <input
                    className="in-field"
                    value={reason}
                    onChange={handlereason}
                  />

                </div>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        {openreasonModal ? null : (
          <Button style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }} onClick={handleModal}>
            Add
          </Button>
        )}
        <Button variant="secondary">
          Exit
        </Button>
      </Modal.Footer>

      <ReasonAskModal
        show={openreasonModal}
        handleClose={newHandleClose}
        handleadd={addReason}
        reason={reason}
        selectedGroup={selectedGroup}
      />
    </Modal>
  )
}
