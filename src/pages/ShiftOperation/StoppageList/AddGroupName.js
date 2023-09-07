import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import DeleteAskModal from '../StoppageList/DeleteAskModal'
import {  toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AddGroupName({openAddGroup,setOpenAddGroup,getGroupName}) {
    const handleClose=()=>{
        setOpenAddGroup(false);
    }

    const[getGroupNameList,setGetGroupNameList]=useState([])

    const [openModal, setOpenModal] = useState(false);
    const handleModal = () => {
      setOpenModal(true)
    }
    const newHandleClose = () => {
      setOpenModal(false)
    }

    const addGroupName=()=>{
      axios.post(
       "http://172.16.20.61:5006/reports/addGroupName",{GroupName:groupName
      }).then((response) => {
        console.log(response.data)
        setGetGroupNameList(response.data);
     });
     setOpenModal(false)
     setOpenAddGroup(false)
     toast.success("Group name added successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    axios.get(
      "http://172.16.20.61:5006/reports/getGroupName",
      {
     }).then((response) => {
       console.log(response.data)
       setGetGroupNameList(response.data);
    });
    }



    const [groupName, setGroupName] = useState('');
    const handlegroupname = (event) => {
      const addedtext = event.target.value;
      setGroupName(addedtext)
    }
   

  return (
    
    <Modal show={openAddGroup} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Magod Laser:Add Group Name</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {/* <h5 className='ms-2'>{selectedRow.refName}</h5> */}
    <div className="col-md-12 col-sm-12 ip-box form-bg">
      <div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <label className="form-label">Group Name</label>
            <input  
            className="in-field"
            value={groupName}
            onChange={handlegroupname}
          />
          </div>
        </div>
      </div>
    </div>
    </Modal.Body>

    

    <Modal.Footer>
    <Button style={{backgroundColor:"#2b3a55",border:"#2b3a55"}} onClick={handleModal}>
       Add 
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Exit
      </Button>
    </Modal.Footer>

    <DeleteAskModal
    show={openModal}
    handleClose={newHandleClose}
    data={{title: 'Add GroupName', content: 'Are you sure you want to add?' }}
    handleDelete={addGroupName}

  />
  </Modal>


  )
}
