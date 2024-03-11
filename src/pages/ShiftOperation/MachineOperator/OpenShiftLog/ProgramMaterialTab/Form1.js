import React, { useMemo, useState } from "react";
import ProgramMtrlTableProfile from "./ProgramMtrlTableProfile";
import { useGlobalContext } from "../../../../../Context/Context";
import GlobalModal from "../../GlobalModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import ProgrmMatrlTableService from "./ProgrmMatrlTableService";
import { useEffect } from "react";

export default function Form1({
  afterloadProgram,
  showTable,
  setAfterloadProgram,
  selectedMachine,
  getMachineShiftStatusForm,
  selectshifttable,
  getmiddleTbaleData,
  setMachinetaskdata,
}) {
  const {
    afterRefreshData,
    setAfterRefreshData,
    formdata,
    setFormData,
    hasBOM,
    machineTaskService,
    pgmNo,
    setPgmNo,timeDiffInMinutes, setTimeDiffInMinutes
  } = useGlobalContext();
  const [mismatchModal, setmismatchModal] = useState(false);
  const [loadProgram, setLoadProgram] = useState(false);

  const handleSubmit = () => {
    setmismatchModal(true);
  };

  const handleClose = () => {
    setLoadProgram(false);
    setmismatchModal(false);
  };

  useEffect(() => {
    getmiddleTbaleData();
  }, []);

  //update Machine Time
  const updateMachineTime=()=>{
    axios.post(baseURL + "/ShiftOperator/updateMachineTime",
    {Machine:selectshifttable?.Machine})
    .then((response) => {
    });
  }

  
  useEffect(() => {
    updateMachineTime();
  }, [selectshifttable]);


  //selecting table
  const [selectedMtrlTable, setSelectedMtrlTable] = useState([]);

  const rowSelectMtrlTable = (item, index) => {
    const selectedRowData = afterRefreshData[index];
    const isSelected = selectedMtrlTable.includes(selectedRowData);
    if (isSelected) {
      // If the row is already selected, remove it from the selection
      setSelectedMtrlTable(
        selectedMtrlTable.filter((row) => row !== selectedRowData)
      );
    } else {
      // If the row is not selected, add it to the selection
      setSelectedMtrlTable([...selectedMtrlTable, selectedRowData]);
    }
  };


  let ProgramNo = formdata?.NCProgramNo;
  const loadProgramSubmit = () => {
    console.log(selectedMtrlTable.length);
    if (selectedMtrlTable.length < 1) {
      toast.error("Please Select a Material", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      if (selectedMtrlTable.Used === 1 || selectedMtrlTable.Rejected === 1) {
        toast.error("Cannot Load the Material that is Used or Rejected", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        setLoadProgram(true);
      }
    }
  };

  // console.log("selectedMtrlTable is",selectedMtrlTable)

  const onclickofYes = () => {
    // console.log("selectedMtrlTable is",selectedMtrlTable)
    axios
      .post(baseURL + "/ShiftOperator/loadMaterial", {
        selectedMtrlTable,
        MachineName: selectedMachine,
      })
      .then((response) => {
        toast.success("Material Loaded Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    setLoadProgram(false);
    getMachineShiftStatusForm();
  };

  // Utility function to convert minutes to "hh:mm" format
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0 && mins === 0) {
      return "0 Hours 0 Min";
    }

    const hoursString = hours > 0 ? `${hours} Hours` : "";
    const minsString = mins > 0 ? `${mins} Min` : "";

    return `${hoursString} ${minsString}`.trim();
  };

  useEffect(() => {
    setPgmNo(formdata?.NCProgramNo);
  }, [formdata?.NCProgramNo]);

  // console.log("timeDiffInMinutes in Form is ",timeDiffInMinutes);

  
const[MachineTime,setMachineTime]=useState('');
const updateMachineTime1 = () => {
  if (formdata?.ActualTime === null || isNaN(formdata?.ActualTime) || isNaN(timeDiffInMinutes)) {
    setMachineTime(null); // Set MachineTime to null if data is unavailable
    return;
  }

  const hoursActualTime = Math.floor(formdata?.ActualTime / 60); // Calculate hours from ActualTime
  const minsActualTime = formdata?.ActualTime % 60; // Calculate remaining minutes from ActualTime
  const hoursTimeDiff = Math.floor(timeDiffInMinutes / 60); // Calculate hours from timeDiffInMinutes
  const minsTimeDiff = timeDiffInMinutes % 60; // Calculate remaining minutes from timeDiffInMinutes

  // Calculate total hours and minutes for MachineTime
  const totalHours = hoursActualTime + hoursTimeDiff;
  const totalMins = minsActualTime + minsTimeDiff;

  // Adjust the total if minutes exceed 60
  const adjustedHours = totalHours + Math.floor(totalMins / 60);
  const adjustedMins = totalMins % 60;

  // Update MachineTime
  const newMachineTime = `${adjustedHours} Hours ${adjustedMins} Min`;
  setMachineTime(newMachineTime);
};


useEffect(() => {
  updateMachineTime1();
}, [formdata?.ActualTime, timeDiffInMinutes]);



  // console.log("MachineTime is",MachineTime);
  
  return (
    <>
      <div>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg">
            <div className="col-md-8  ms-4" style={{ textAlign: "center" }}>
              <label className="form-label ms-5" style={{ fontSize: "12px" }}>
                NC Program sheet Details
              </label>
            </div>
            <div className="row ms-3">
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Program no
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  // value={formdata?.NCProgramNo || ""}
                  value={
                    formdata?.NCProgramNo !== undefined
                      ? formdata?.NCProgramNo
                      : ""
                  }
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  To Process
                </label>
                <input
                  className="in-field "
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  // value={formdata?.Qty || ""}
                  value={formdata?.Qty !== undefined ? formdata?.Qty : ""}
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Allotted
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={
                    formdata?.QtyAllotted !== undefined
                      ? formdata?.QtyAllotted
                      : ""
                  }
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Processed
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  // value={formdata?.QtyCut}
                  value={formdata?.QtyCut !== undefined ? formdata?.QtyCut : ""}
                />
              </div>

              <div className="col-md-6 ">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Drawings
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  // value={formdata?.NoOfDwgs || ""}
                  value={
                    formdata?.NoOfDwgs !== undefined ? formdata?.NoOfDwgs : ""
                  }
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Total parts
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  // value={formdata?.TotalParts || ""}
                  value={
                    formdata?.TotalParts !== undefined
                      ? formdata?.TotalParts
                      : ""
                  }
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Program Time
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={
                    formdata?.EstimatedTime !== null
                      ? convertMinutesToTime(formdata?.EstimatedTime)
                      : " "
                  }
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Machine Time
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                    value={MachineTime ?? ''}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Remarks
                </label>

                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={formdata?.Remarks || ""}
                />
              </div>

              <div style={{ textAlign: "center" }} className="col-md-4">
                <div>
                  {!hasBOM ? (
                    <button
                      className="button-style mt-3 group-button mt-4 mb-2"
                      style={{ width: "140px", fontSize: "13px" }}
                      onClick={loadProgramSubmit}
                    >
                      Load Program Material
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {hasBOM === true ? (
        <ProgrmMatrlTableService
          showTable={showTable}
          selectshifttable={selectshifttable}
          setMachinetaskdata={setMachinetaskdata}
        />
      ) : (
        <ProgramMtrlTableProfile
          afterRefreshData={afterRefreshData}
          setAfterRefreshData={setAfterRefreshData}
          showTable={showTable}
          selectedMtrlTable={selectedMtrlTable}
          rowSelectMtrlTable={rowSelectMtrlTable}
          setSelectedMtrlTable={setSelectedMtrlTable}
          selectedMachine={selectedMachine}
          ProgramNo={ProgramNo}
          getmiddleTbaleData={getmiddleTbaleData}
          selectshifttable={selectshifttable}
          setMachinetaskdata={setMachinetaskdata}
        />
      )}

      <GlobalModal
        show={loadProgram}
        title="magod_machine"
        content=<div>
          Do You wish to Load Material ID:{" "}
          <strong>{selectedMtrlTable[0]?.ShapeMtrlID}</strong> ?
        </div>
        onYesClick={() => onclickofYes()}
        onNoClick={() => setLoadProgram(false)}
        onClose={handleClose}
      />

      <GlobalModal
        show={mismatchModal}
        title="magod_machine"
        content=<div>Parts Quantity Mismatch</div>
        onYesClick={() => setmismatchModal(false)}
        onNoClick={() => setmismatchModal(false)}
        onClose={handleClose}
      />
    </>
  );
}
