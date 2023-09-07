import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


export default function AddReason({openAddReason,setOpenAddReason,selectedGroup}) {
    const handleClose=()=>{
        setOpenAddReason(false)
    }
  return (
    <Modal show={openAddReason} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Magod Laser:Add Reason</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {/* <h5 className='ms-2'>{selectedRow.refName}</h5> */}
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
            className="in-field" />
          </div>
        </div>
      </div>
    </div>
    </Modal.Body>

    <Modal.Footer>
    <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}}>
       Add 
      </Button>
      <Button variant="secondary">
        Exit
      </Button>
    </Modal.Footer>
  </Modal>
  )
}
