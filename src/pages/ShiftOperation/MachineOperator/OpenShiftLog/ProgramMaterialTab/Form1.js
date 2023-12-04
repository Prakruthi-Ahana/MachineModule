import React, { useMemo, useState } from "react";
import ProgramMtrlTableProfile from "./ProgramMtrlTableProfile";
import { useGlobalContext } from "../../../../../Context/Context";
import GlobalModal from "../../GlobalModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";
import ProgrmMatrlTableService from "./ProgrmMatrlTableService";

export default function Form1({
  afterloadProgram,
  showTable,
  setAfterloadProgram,
  selectedMachine,
  getMachineShiftStatusForm,selectshifttable
}) {
  const {
    afterRefreshData,
    setAfterRefreshData,
    formdata,
    setFormData,
    hasBOM,machineTaskService
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

  //selecting table
  const [selectedMtrlTable, setSelectedMtrlTable] = useState({});
  const rowSelectMtrlTable = (item, index) => {
    let list = { ...item, index: index };
    setSelectedMtrlTable(list);
  };

  useMemo(() => {
    // console.log("afterRefreshData[0]:", afterRefreshData[0]);
    setSelectedMtrlTable({ ...afterRefreshData[0], index: 0 });
  }, [afterRefreshData[0]]);

  const loadProgramSubmit = () => {
    if (selectedMtrlTable.Used === 1 || selectedMtrlTable.Rejected === 1) {
      toast.error("Cannot Load the Material that is Used or Rejected", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setLoadProgram(true);
    }
  };

  const onclickofYes = () => {
    axios
      .post(baseURL + "/ShiftOperator/loadMaterial", {
        selectedMtrlTable,
        MachineName: selectedMachine,
      })
      .then((response) => {});
    setLoadProgram(false);
    getMachineShiftStatusForm();
  };

  // Utility function to convert minutes to "hh:mm" format
  const convertMinutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const hoursString = hours > 0 ? `${hours} Hours` : "";
    const minsString = mins > 0 ? `${mins} Min` : "";

    return `${hoursString} ${minsString}`.trim();
  };

  // console.log(hasBOM);

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
                  value={formdata?.NCProgramNo || ""}
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
                  value={formdata?.Qty || ""}
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
                  value={formdata?.QtyAllotted || ""}
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
                  value={formdata?.QtyCut || ""}
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
                  value={formdata?.NoOfDwgs || ""}
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
                  value={formdata?.TotalParts || ""}
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
                  value={convertMinutesToTime(formdata?.EstimatedTime || 0)}
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
                  value={convertMinutesToTime(formdata?.ActualTime || 0)}
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
        />
      )}

      <GlobalModal
        show={loadProgram}
        title="magod_machine"
        content=<div>
          Do You wish to Load Material ID:{" "}
          <strong>{selectedMtrlTable.ShapeMtrlID}</strong> ?
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
