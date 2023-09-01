import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function OpenShiftModal({
  openmodal,
  setOpenmodal,
  selectedMachine,
  finalDay1,
  selectshifttable,
  Shift,
  date,
}) {

  const handleClose = () => {
    setOpenmodal(false);
  };

  const data = {
    selectedMachine: selectedMachine,
    finalDay1: finalDay1,
    selectshifttable: selectshifttable,
    Shift: Shift,
    date: date,
  };

  const navigate = useNavigate();
  const openShiftPage = () => {
    navigate("OpenShiftLog", { state: { data } });
  };

  console.log(selectshifttable);
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

  return (
    <div>
      <Modal show={openmodal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Magod Machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {numberOfProperties === 0
            ? "No present shift assigned for this machine."
            : "Is Program Operator Meeting running from the beginning of this shift?"}
        </Modal.Body>

        <Modal.Footer>
          {numberOfProperties === 0 ? (
            <Button variant="primary" onClick={handleClose}>
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
