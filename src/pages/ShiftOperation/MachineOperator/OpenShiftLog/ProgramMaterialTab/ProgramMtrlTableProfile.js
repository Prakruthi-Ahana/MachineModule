import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ShowUsedModal from "./ShowUsedModal";
import AllModal from "../ProductionReportTab/MaterialUsageTab/AllModal";
import ShowAllModal from "./ShowAllModal";
import MarkAsUsedModal from "./MarkAsUsedModal";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";
import { toast } from "react-toastify";
import { uncountability } from "i/lib/methods";
import MarkAsRejected from "./MarkAsRejected";
import { useGlobalContext } from "../../../../../Context/Context";

export default function ProgrmMatrlTableProfile({
  afterloadProgram,
  setAfterloadProgram,
  showTable,
  selectedMtrlTable,
  rowSelectMtrlTable,
  setSelectedMtrlTable,
  selectedMachine,
  ProgramNo,getmiddleTbaleData
}) {
  const { afterRefreshData, setAfterRefreshData, NcId } = useGlobalContext();
  const [showusedModal, setShowusedModal] = useState(false);
  const [allModal, setAllModal] = useState(false);
  const [isCheckboxchecked, setIsCheckboxchecked] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [isDataFiltered, setIsDataFiltered] = useState(false);

  const filterUnusedData = () => {
    // Filter the ProductionReportData array to show only rows where Used and Rejected are both 0
    const filteredData = afterRefreshData.filter((data) => data.Used === 0);
    setOriginalData(afterRefreshData); // Save the original data
    setAfterRefreshData(filteredData); // Update the filtered data
    setIsDataFiltered(true); // Set the flag to indicate data is filtered
  };
  const resetData = () => {
    setAfterRefreshData(originalData); // Restore the original data
    setIsDataFiltered(false); // Clear the data filtered flag
  };

  const handleCheckBoxChange = () => {
    setIsCheckboxchecked(!isCheckboxchecked);
    if (isCheckboxchecked) {
      setAllModal(true);
    } else {
      setShowusedModal(true);
    }
  };

  const [MarkasUsed, setMarkasUsed] = useState(false);
  const [MarkasReject, setMarkasReject] = useState(false);

  const handleMarkasUsedModal = () => {
    if (selectedMtrlTable.Used === 1 || selectedMtrlTable.Rejected === 1) {
      toast.error("Once material used or Rejected Cannot be used again", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setMarkasUsed(true);
    }
  };

  const handleMarkasRejected = () => {
    if (selectedMtrlTable.Used === 1 || selectedMtrlTable.Rejected === 1) {
      toast.error("Once material used or Rejected Cannot be used again", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setMarkasReject(true);
    }
  };

  const handleMarkasUsed = () => {
    axios
      .post(baseURL + "/ShiftOperator/markAsUsedProgramMaterial", {
        selectedMtrlTable: selectedMtrlTable,
        selectedMachine: selectedMachine,
      })
      .then(() => {
        toast.success("Success", {
          position: toast.POSITION.TOP_CENTER,
        });
        axios
          .post(baseURL + "/ShiftOperator/getdatafatermarkasUsedorRejected", {
            NCProgramNo: ProgramNo,
          })
          .then((response) => {
            console.log("required result", response.data);
            setAfterRefreshData(response?.data);
            if (!response.data) {
              setAfterRefreshData([]);
            }
          });
      })

      .catch((err) => {
        console.error(err);
      });
  };

  const [RejectedReasonState, setRejectedReasonState] = useState({});

  const onChangeInput = (key, e) => {
    const { value } = e.target;
    setRejectedReasonState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Get only the values from RejectedReasonState
  const valuesArray = Object.values(RejectedReasonState);

  // Concatenate the values into a single string
  const newReason = valuesArray.join(" "); // Change the separator as needed

  const UpdateRejectReason = () => {
    if (
      !Object.values(RejectedReasonState).some((reason) => reason.trim() !== "")
    ) {
      toast.error("Rejected Reason is empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Prevent further execution if the reason is empty
    } else {
      axios
        .post(baseURL + "/ShiftOperator/markAsRejectedProgramMaterial", {
          selectedMtrlTable,
          RejectedReason: RejectedReasonState,
        })
        .then((response) => {
          toast.success("Rejected Reason Saved", {
            position: toast.POSITION.TOP_CENTER,
          });
          setRejectedReasonState({});
          setSelectedMtrlTable([]);
          axios
            .post(baseURL + "/ShiftOperator/getdatafatermarkasUsedorRejected", {
              NCProgramNo: ProgramNo,
            })
            .then((response) => {
              console.log("required result", response.data);
              setAfterRefreshData(response?.data);
              if (!response.data) {
                setAfterRefreshData([]);
              }
            });
        })
        .catch((error) => {
          toast.error("An error occurred while updating reject reason", {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    }
  };


 
  return (
    <div>
      {showTable ? (
        <div className="mt-2">
          <div className="col-md-12 col-sm-12">
            <div className="ip-box form-bg">
              <div className="row" style={{ gap: "10px", marginLeft: "-5px" }}>
                <div
                  style={{ textAlign: "center", marginLeft: "-12px" }}
                  className="col-md-3"
                >
                  <div>
                    <button
                      className="button-style mt-2 group-button mt-4 mb-2"
                      style={{ width: "90px", fontSize: "13px" }}
                      onClick={handleMarkasUsedModal}
                    >
                      Mark as Used
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: "center" }} className="col-md-4">
                  <div>
                    <button
                      className="button-style mt-2 group-button mt-4 mb-2"
                      style={{ width: "110px", fontSize: "13px" }}
                      onClick={handleMarkasRejected}
                    >
                      Mark as Rejected
                    </button>
                  </div>
                </div>

                <div className="col-md-3 row mt-3">
                  <input
                    type="checkbox"
                    className="col-md-2"
                    onChange={handleCheckBoxChange}
                  />
                  <label
                    className="form-label col-md-1 mt-1"
                    style={{ whiteSpace: "nowrap", marginLeft: "-6px" }}
                  >
                    <b>Show unused</b>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {showTable ? (
        <div
          className="mt-2 col-md-12 col-sm-12"
          style={{ overflow: "scroll", height: "230px" }}
        >
          <Table striped className="table-data border">
            <thead
              className="tableHeaderBGColor table-space"
              style={{ fontSize: "13px" }}
            >
              <tr>
                <th style={{ whiteSpace: "nowrap" }}>Material ID</th>
                <th>Length</th>
                <th>Width</th>
                <th>Used</th>
                <th>Rejected</th>
                <th>Rejection Reason</th>
              </tr>
            </thead>

            <tbody
              className="tablebody table-space"
              style={{ fontSize: "12px" }}
            >
              {afterRefreshData?.map((data, key) => (
                <tr
                  onClick={() => {
                    rowSelectMtrlTable(data, key);
                  }}
                  className={
                    selectedMtrlTable.includes(data) ? "selcted-row-clr" : ""
                  }
                >
                  <td>{data.ShapeMtrlID}</td>
                  <td>{data.Para1}</td>
                  <td>{data.Para2}</td>
                  <td>
                    <input type="checkbox" checked={data.Used === 1} />
                  </td>
                  <td>
                    <input type="checkbox" checked={data.Rejected === 1} />
                  </td>

                  <td>
                    <div key={data.index}>
                      <input
                        className="table-cell-editor"
                        style={{ textAlign: "center", width: "150px" }}
                        value={
                          data.Rejected === 1
                            ? data.RejectionReason
                            : RejectedReasonState[data.NcPgmMtrlId] || ""
                        }
                        readOnly={data.Rejected === 1}
                        onChange={(e) => onChangeInput(data.NcPgmMtrlId, e)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}
      <div>
        <ShowUsedModal
          showusedModal={showusedModal}
          setShowusedModal={setShowusedModal}
          filterUnusedData={filterUnusedData}
        />

        <ShowAllModal
          allModal={allModal}
          setAllModal={setAllModal}
          resetData={resetData}
        />

        <MarkAsUsedModal
          MarkasUsed={MarkasUsed}
          setMarkasUsed={setMarkasUsed}
          handleMarkasUsed={handleMarkasUsed}
        />

        <MarkAsRejected
          MarkasReject={MarkasReject}
          setMarkasReject={setMarkasReject}
          handleMarkasRejected={UpdateRejectReason}
        />
      </div>
    </div>
  );
}
