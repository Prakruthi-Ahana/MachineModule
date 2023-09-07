import React, { useState } from "react";
import AddGroupName from "./AddGroupName";
import AddReason from "./AddReason";
import DeleteAskModal from "./DeleteAskModal";

export default function StoppageForm({selectedGroup}) {
    console.log(selectedGroup);

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
   const [modalData, setModalData] = useState({  title: 'Delete GroupName', 
   content: 'Are you sure you want to delete?'});

  const handleShowModal = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = (data) => {
    // Handle the delete action here with the data object
    // For example, you can make an API call to delete the data
    console.log(`Deleting data with title: ${data.title}`);
    // Then, close the modal
    handleCloseModal();
  };
 
  return (
    <div className="ip-box form-bg">
        <AddGroupName
        openAddGroup={openAddGroup}
        setOpenAddGroup={setOpenAddGroup}
        />
        <AddReason  openAddReason={openAddReason}
        setOpenAddReason={setOpenAddReason}
        selectedGroup={selectedGroup}
        />
         <DeleteAskModal
        show={showModal}
        handleClose={handleCloseModal}
        data={modalData}      
        handleDelete={handleConfirmDelete}
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
          onClick={() => handleShowModal({ title: 'Delete GroupName', content: 'Are you sure you want to delete?' })}        >
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
          onClick={() => handleShowModal({ title: 'Delete Reason', content: 'Are you sure you want to Delete?' })}
        >
          Delete Reason
        </button>
      </div>
    </div>
  );
}
