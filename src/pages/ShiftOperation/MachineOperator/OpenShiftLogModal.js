import axios from "axios";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api/baseUrl";
import { useGlobalContext } from "../../../Context/Context";

export default function OpenShiftModal({
  openmodal,
  setOpenmodal,
  selectedMachine,
  finalDay1,
  selectshifttable,
  Shift,
  date,
  requiredProgram
}) {
  const data = {
    selectedMachine: selectedMachine,
    finalDay1: finalDay1,
    selectshifttable: selectshifttable,
    Shift: Shift,
    date: date,
  };
  const {setShiftLogDetails,shiftLogDetails}=useGlobalContext();


  const navigate = useNavigate();
  // console.log("requiredProgram",requiredProgram);

  const openShiftPage = () => {
    // console.log(requiredProgram[0].NCProgarmNo);
    if (isNaN(requiredProgram[0].NCProgarmNo)) {
      // console.log("excuted NaN query")
      navigate("OpenShiftLog", { state: { data } });
      axios
          .post(baseURL + "/ShiftOperator/onClickYesStoppage", {
              requiredProgram,
              selectshifttable,
          })
          .then((response) => {
              // handle response if needed
          })
          .catch((error) => {
              // handle error if needed
          });
          }
             else {
              // console.log("excuted No Query")
              navigate("OpenShiftLog", { state: { data } });
        axios
            .post(baseURL + "/ShiftOperator/onClickYes", {
                requiredProgram,
                selectshifttable,
            })
            .then((response) => {
                // handle response if needed
            })
            .catch((error) => {
                // handle error if needed
            });
    }
};


const handleClose = () => {
  // console.log(requiredProgram[0].NCProgarmNo,selectshifttable)
  if (isNaN(requiredProgram[0].NCProgarmNo)) {
    navigate("OpenShiftLog", { state: { data } });
    axios
      .post(baseURL + "/ShiftOperator/onClickNoStoppage", {
        requiredProgram,
        selectshifttable,
      })
      .then((response) => {});
    setOpenmodal(false);
  }
  else
  {
    navigate("OpenShiftLog", { state: { data } });
    axios
      .post(baseURL + "/ShiftOperator/onClickNo", {
        requiredProgram,
        selectshifttable,
      })
      .then((response) => {});
    setOpenmodal(false);
  }
};

  const getShiftLogData=()=>{
    axios
    .post(baseURL + "/ShiftOperator/getShiftLog", {
      selectshifttable: selectshifttable,
    })
    .then((response) => {
      const updatedData = response.data.map((item) => {
        let dateSplit = item.FromTime.split(" ");
        let date = dateSplit[0].split("-");
        let year = date[0];
        let month = date[1];
        let day = date[2];
        let finalDay = `${day}/${month}/${year} ${dateSplit[1]}`;
        item.FromTime = finalDay;

        let dateSplit1 = item.ToTime.split(" ");
        let date1 = dateSplit1[0].split("-");
        let year1 = date1[0];
        let month1 = date1[1];
        let day1 = date1[2];
        let finalDay1 = `${day1}/${month1}/${year1} ${dateSplit1[1]}`;
        item.ToTime = finalDay1;

        if (item.Locked === 1) {
          item.rowColor = "#87CEEB";
        } else {
          // console.log(null);
        }
        return item;
      });

      // Update the state with the modified data
      setShiftLogDetails(updatedData);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
  }

  useEffect(()=>{
    getShiftLogData();
  },[])

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
