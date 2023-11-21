import React, { useEffect, useState } from "react";
import { baseURL } from "../../../../api/baseUrl";
import axios from "axios";
import { useGlobalContext } from "../../../../Context/Context";

export default function MachineShiftStatusForm({
  selectshifttable,
  Shift,
  finalDay1,
  date,
  showTable,
  machineShiftStatus,
  getMachineShiftStatusForm
}) {
  const { selectedProgram } = useGlobalContext();

  var count = 0;
  const [isInputVisible, setInputVisible] = useState(false);

  const toggleInput = () => {
    count = count + 1;
    if (count === 1) {
      setInputVisible(true);
    } else {
      setInputVisible(false);
      ///ChangeOperator
      axios
        .post(baseURL + "/ShiftOperator/updateOperator", {
          Operator: ChangedOperator,selectshifttable})
        .then((response) => {
          getMachineShiftStatusForm();
        });
    }
  };

  const [operatorsList, setOperatorsList] = useState([]);
  useEffect(() => {
    axios.get(baseURL + "/ShiftOperator/getShiftIncharge").then((response) => {
      // console.log(response.data);
      setOperatorsList(response.data);
    });
  }, []);
  const [ChangedOperator, setChangedOperator] = useState("");
  const handleShiftIncharge = (e) => {
    setChangedOperator(e.target.value);
  };

  const formatDateTime = (dateTimeString) => {
    const options = { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false };
    return new Date(dateTimeString).toLocaleString(undefined, options).replace(',', '');
  };
  

  console.log(machineShiftStatus[0])

  const [runningTime, setRunningTime] = useState("")
  useEffect(() => {
    const updateRunningTime = () => {
      if (machineShiftStatus && machineShiftStatus.length > 0) {
        const programStartTime = new Date(machineShiftStatus[0]?.ProgramStartTime);

        if (!isNaN(programStartTime.getTime())) {
          const currentTime = new Date();
          const diffInMilliseconds = currentTime - programStartTime;

          if (diffInMilliseconds >= 0) {
            const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

            setRunningTime(`${hours} hours ${minutes} mins`);
          } else {
            setRunningTime("N/A");
          }
        } else {
          setRunningTime("N/A");
        }
      } else {
        setRunningTime("N/A");
      }
    };
    updateRunningTime();
    const intervalId = setInterval(updateRunningTime, 30000);
    return () => clearInterval(intervalId);
  }, [machineShiftStatus]);

  // Save runningTime to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("runningTime", runningTime);
  }, [runningTime]);


//update sheettime
const[sheetrunTime,setSheetRuntime]=useState("")

const updateSheettime=()=>{
  if (machineShiftStatus && machineShiftStatus.length > 0) {
    const SheetStartTime = new Date(machineShiftStatus[0]?.SheetStartTime);

    if (!isNaN(SheetStartTime.getTime())) {
      const currentTime = new Date();
      const diffInMilliseconds = currentTime - SheetStartTime;

      if (diffInMilliseconds >= 0) {
        const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

        setSheetRuntime(`${hours} hours ${minutes} mins`);
      } else {
        setSheetRuntime("0");
      }
    } else {
      setSheetRuntime("0");
    }
  } else {
    setSheetRuntime("0");
  }
}

useEffect(()=>{
  if(machineShiftStatus[0]?.MtrlID===''){
    setSheetRuntime(runningTime)
  }
  else{
    updateSheettime();
    updateSheettime();
    const intervalId = setInterval(updateSheettime, 30000);
    return () => clearInterval(intervalId);
  }

},[machineShiftStatus])

useEffect(() => {
  localStorage.setItem("runningTime", sheetrunTime);
}, [sheetrunTime]);


  return (
    <>
      <div className="">
        <div
          style={{
            textAlign: "",
            backgroundColor: "#d3d3d3",
            marginTop: "2px",
            marginLeft: "-12px",
            fontSize: "14px",
          }}
        >
          <p style={{ textAlign: "center" }}>
            {" "}
            <b>Machine Shift Status </b>
          </p>

          <div className="d-flex ms-4">
            <div style={{ width: "auto", textAlign: "left" }}>
              <div style={{ marginLeft: "5px" }}>
                {" "}
                <b>Operator : {selectshifttable.Operator} </b>
              </div>
              <div style={{ marginLeft: "5px" }}>
                <b>Current : {machineShiftStatus[0]?.Operator} </b>
              </div>
            </div>
          </div>

          <br></br>

          <div className="d-flex">
            <button
              className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "80px", fontSize: "14px", marginLeft: "20px" }}
              onClick={toggleInput}
            >
              Select{" "}
              {isInputVisible ? (
                <div
                  className="col-md-12"
                  style={{
                    marginLeft: "120px",
                    marginTop: "-25px",
                    width: "140px",
                  }}
                >
                  <select
                    className="ip-select"
                    onChange={handleShiftIncharge}
                    value={selectshifttable.Operator}
                  >
                    <option selected>Select Shift Incharge</option>
                    {operatorsList.map((operatorsList) => (
                      <option value={operatorsList}>{operatorsList}</option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>

      <div className=" mt-2 ">
        <div
          style={{
            textAlign: "",
            backgroundColor: "#d3d3d3",
            marginLeft: "-12px",
            fontSize: "14px",
          }}
        >
          <p style={{ textAlign: "center" }}>
            <b>Process Task Status </b>
          </p>
          <div className="d-flex">
            <div style={{ width: "auto", textAlign: "left" }}>
              <div style={{ marginLeft: "15px" }}>
                {" "}
                <b>Task No : {machineShiftStatus[0]?.TaskNo} </b>
              </div>

              <div style={{ marginLeft: "15px" }}>
                <b>Operation : {machineShiftStatus[0]?.Operation } </b>
              </div>
              <div style={{ color: "", marginLeft: "15px" }}>
                {" "}
                <b>Material : {machineShiftStatus[0]?.Mtrl_Code} </b>
              </div>

              <div style={{ marginLeft: "15px" }}>
                <b>
                  Program no : {machineShiftStatus[0]?.NCProgarmNo}
                </b>
              </div>
              <div style={{ marginLeft: "15px" }}>
                {" "}
                <b>Start Time :{formatDateTime(machineShiftStatus[0]?.ProgramStartTime)}</b>
              </div>

              <div className="mb-3" style={{ color: "", marginLeft: "15px" }}>
                <b>Running For :{runningTime}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div
          className=""
          style={{
            backgroundColor: "#d3d3d3",
            marginLeft: "-12px",
            fontSize: "14px",
            marginBottom: "20px",
            height: "115px",
          }}
        >
          <div>
            <p style={{ textAlign: "center" }}>
              <b>Material Machine Time</b>
            </p>
            <div className="d-flex mx-2">
              <div style={{ width: "auto", textAlign: "left" }}>
                <div style={{ marginLeft: "10px" }}>
                  <b>Sheet Id :{machineShiftStatus[0]?.MtrlID} </b>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {" "}
                  <b>Start Time : {formatDateTime(machineShiftStatus[0]?.SheetStartTime)}</b>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <b>Running For :{sheetrunTime}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
