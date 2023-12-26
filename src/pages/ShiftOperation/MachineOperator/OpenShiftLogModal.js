import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api/baseUrl";

export default function OpenShiftModal({
  openmodal,
  setOpenmodal,
  selectedMachine,
  finalDay1,
  selectshifttable,
  Shift,
  date,
  requiredProgram,z
}) {
  const data = {
    selectedMachine: selectedMachine,
    finalDay1: finalDay1,
    selectshifttable: selectshifttable,
    Shift: Shift,
    date: date,
  };

  const navigate = useNavigate();
  const openShiftPage = () => {
    // console.log(requiredProgram,"onclick of yes")
    navigate("OpenShiftLog", { state: { data } });
    axios
      .post(baseURL + "/ShiftOperator/onClickYes", {
        requiredProgram,
        selectshifttable,
      })
      .then((response) => {});
  };

  const countUserDefinedProperties = (obj) => {
    let count = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && key !== "index") {
        count++;
      }
    }
    return count;
  };

  const numberOfProperties = countUserDefinedProperties(selectshifttable);

  const handleClose = () => {
    navigate("OpenShiftLog", { state: { data } });
    axios
      .post(baseURL + "/ShiftOperator/onClickNo", {
        requiredProgram,
        selectshifttable,
      })
      .then((response) => {});
    setOpenmodal(false);
  };

  const handleCloseOk = () => {
    setOpenmodal(false);
  };



  // console.log(requiredProgram[0]?.NCProgarmNo)

  return (
    <div>
      <Modal show={openmodal} onHide={handleCloseOk}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {numberOfProperties === 0
            ? "No present shift assigned for this machine."
            : (
              <>
                {"Is "} {"Program"} {" "}
                  <strong>{requiredProgram[0]?.NCProgarmNo}</strong>
                {" running from the beginning of this shift?"}
              </>
            )}
        </Modal.Body>

        <Modal.Footer>
          {numberOfProperties === 0 ? (
            <Button variant="primary" onClick={handleCloseOk}>
              OK
            </Button>
          ) : (
            <>
              <Button
                style={{ backgroundColor: "#2b3a55", border: "#2b3a55" }}
                onClick={openShiftPage}
              >
                Yes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                No
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
