import React, { useEffect, useState } from "react";
import AddGroupName from "./AddGroupName";
import AddReason from "./AddReason";
import DeleteAskModal from "./DeleteAskModal";
import StoppageReasonTable from "./StoppageReasonTable";
import axios from "axios";
import {  toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DeleteGroupModal from "./DeleteGroupModal";

export default function StoppageForm({selectedGroup,getGroupName}) {

  const[getReasonsList,setGetReasonsList]=useState([])
const getReasons=()=>{
  axios.post(
   "http://172.16.20.61:5006/reports/getReason",
   {
    StoppageGpId:selectedGroup?.StoppageGpId
  }).then((response) => {
    setGetReasonsList(response.data);
 });
}
useEffect(()=>{
    getReasons();
},[selectedGroup]);

  const[selectedReason,setSelectedReason]=useState({})
const selectReasonFun=(item,index)=>{
  let list={...item,index:index}
  // api call
  setSelectedReason (list);
}

    //open AddGroupName
    const[openAddGroup,setOpenAddGroup]=useState(false);
    const openAddGroupNameModal=()=>{
        setOpenAddGroup(true);
    }

    //open Reason
    const[openAddReason,setOpenAddReason]=useState(false);
    const openAddReasonModal=()=>{
        setOpenAddReason(true);
    }

    //Delete GroupName
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: 'Delete GroupName', content: `Are you sure you want to delete ${selectedReason?.Stoppage}?`});

  const handleShowModal = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


const DeleteReason=()=>{
      axios.post(
       "http://172.16.20.61:5006/reports/deleteReason",{selectedReason
      }).then((response) => {
        console.log("delete function called")
        console.log(response.data)
      
     });
     setShowModal(false);
          toast.success("Reason Deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
    axios.post(
      "http://172.16.20.61:5006/reports/getReason",
      {
       StoppageGpId:selectedGroup?.StoppageGpId
     }).then((response) => {
       setGetReasonsList(response.data);
    });
    }

    console.log("nvyvtujyjk", selectedGroup?.StoppageGpId )


    const DeleteGroup = () => {
      axios.post(
       "http://172.16.20.61:5006/reports/deleteGroup",{StoppageGpId:selectedGroup?.StoppageGpId
      }).then((response) => {
        console.log("delete function called")
        console.log("Yes This one",response.data)
      
     });
     setShowModal(false);
          toast.success("Group Deleted successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
    


  return (
    <div>
    <div className="ip-box form-bg">
        <AddGroupName
        openAddGroup={openAddGroup}
        setOpenAddGroup={setOpenAddGroup}
        getGroupName={getGroupName}
        />
        <AddReason  openAddReason={openAddReason}
        setOpenAddReason={setOpenAddReason}
        selectedGroup={selectedGroup}
        setGetReasonsList={setGetReasonsList}
        />

         <DeleteAskModal
        show={showModal}
        handleClose={handleCloseModal}
        data={modalData}      
        handleDelete={DeleteReason}
      
      />

      <DeleteGroupModal
      show={showModal}
      handleClose={handleCloseModal}
      data={modalData}      
      handleGroup={DeleteGroup}
      
      />

     

      <div className="row"> 
          <div className="col-md-9">
            <div className="col-md-12 ">
              <label className="form-label">Group Name</label>
              <input
                className="in-fields"
                value={selectedGroup.GroupName || ' '}
                disabled
              />
            </div>
          </div>
      </div>

      <div className="row mt-3 mb-3">
        <button
          className="button-style mt-2 group-button"
          type="button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={openAddGroupNameModal}
        >
          Add Group Name
        </button>

        <button
          className="button-style mt-2 group-button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={() => handleShowModal({ title: 'Delete GroupName', content: <div>Are you sure you want to delete <strong>{selectedGroup.GroupName}</strong> from selected Group Name</div> })}        >
          Delete Group
        </button>

        <button
          className="button-style mt-2 group-button"   
          type="button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={openAddReasonModal}
        >
        Add Reason
        </button>


        <button
          className="button-style mt-2 group-button"
          type="button"
          style={{ width: "150px", marginLeft: "20px" }}
          onClick={() => handleShowModal({ title: 'Delete Reason', content: 'Are you sure you want to Delete?' }
          
          )}
        >
          Delete Reason
        </button>

       

      </div>
    </div>

    <div>
    <StoppageReasonTable
    selectedGroup={selectedGroup}
    selectedReason={selectedReason}
    selectReasonFun={selectReasonFun}
    getReasonsList={getReasonsList}
    />
    </div>
    </div>
  );
}
