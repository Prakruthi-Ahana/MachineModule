import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import axios from "axios";
import { baseURL } from "../../../../api/baseUrl";
import { useState } from "react";
import { useGlobalContext } from "../../../../Context/Context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function StoppageAskModal({
  setAlreadyLoad,
  alreadyLoad,
  selectedStoppageID,
  selectshifttable,
  selectedStoppage,
  setShowTable,
  showTable,
  setInputVisible,
  isInputVisible,
  getMachineShiftStatusForm
}) {
  const {
    selectedProgram,
    setShiftLogDetails,
    shiftLogDetails,
  } = useGlobalContext();

  const handleClose = () => {
    setAlreadyLoad(false);
  };


  const onClickYes = () => {
    axios
      .post(baseURL + "/ShiftOperator/addStoppage", {
        selectshifttable: selectshifttable,
        selectedStoppageID: selectedStoppageID,
        selectedStoppage: selectedStoppage,
      })
      .then((response) => {
        toast.success("Stoppage Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setAlreadyLoad(false);
        setShowTable(false);
        setInputVisible(!isInputVisible);
        axios
          .post(baseURL + "/ShiftOperator/getShiftLog", {
            selectshifttable: selectshifttable,
          })
          .then((response) => {
            console.log("response ShiftLog is", response.data);
            for (let i = 0; i < response.data.length; i++) {
              // FOR TgtDelDate
              let dateSplit = response.data[i].FromTime.split(" ");
              let date = dateSplit[0].split("-");
              let year = date[0];
              let month = date[1];
              let day = date[2];
              let finalDay =
                day + "/" + month + "/" + year + " " + dateSplit[1];
              response.data[i].FromTime = finalDay;
            }
            for (let i = 0; i < response.data.length; i++) {
              // Delivery_date
              let dateSplit1 = response.data[i].ToTime.split(" ");
              let date1 = dateSplit1[0].split("-");
              let year1 = date1[0];
              let month1 = date1[1];
              let day1 = date1[2];
              let finalDay1 =
                day1 + "/" + month1 + "/" + year1 + " " + dateSplit1[1];
              response.data[i].ToTime = finalDay1;
            }
            setShiftLogDetails(response.data);
          });
          getMachineShiftStatusForm();
          
      });
  };

  return (
    <div>
      <div>
        <Modal show={alreadyLoad} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>magod_machine</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Do you wish to stop the cutting for <b>{selectedStoppage}</b> ?
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={onClickYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
