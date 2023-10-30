import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import ShowUsedModal from "./ShowUsedModal";
import AllModal from "../ProductionReportTab/MaterialUsageTab/AllModal";
import ShowAllModal from "./ShowAllModal";
import MarkAsUsedModal from "./MarkAsUsedModal";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";

export default function ProgrmMatrlTableProfile({
  afterloadProgram,
  setAfterloadProgram,
  showTable,
  selectedMtrlTable,
  rowSelectMtrlTable

}) {

  const [showusedModal, setShowusedModal] = useState(false);
  const [allModal, setAllModal]=useState(false);
  const [isCheckboxchecked, setIsCheckboxchecked] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [isDataFiltered, setIsDataFiltered] = useState(false);
 
 
 
 const filterUnusedData = () => {
   // Filter the ProductionReportData array to show only rows where Used and Rejected are both 0
   const filteredData = afterloadProgram.filter(data => data.Used === 0 && data.Rejected === 0);
   setOriginalData(afterloadProgram); // Save the original data
   setAfterloadProgram(filteredData); // Update the filtered data
   setIsDataFiltered(true); // Set the flag to indicate data is filtered
 }
 const resetData = () => {
  setAfterloadProgram(originalData); // Restore the original data
   setIsDataFiltered(false); // Clear the data filtered flag
 }
 

  const handleCheckBoxChange = () => {
    setIsCheckboxchecked(!isCheckboxchecked)
    if(isCheckboxchecked){
      setAllModal(true);
    }else{
      setShowusedModal(true)
    }
  }

  console.log(afterloadProgram)

  const[MarkasUsed, setMarkasUsed] = useState(false)

  const handleMarkasUsedModal = () => {
    setMarkasUsed(true)
  }


  const handleMarkasUsed = () => {
    console.log("Enytering into body")
    axios
      .post(baseURL + "/ShiftOperator/markAsUsedProgramMaterial", {
        selectedMtrlTable: selectedMtrlTable,
      })
      .then(() => {
        console.log("Request sent successfully");
           })
      .catch((err) => {
        console.error(err);
      });
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
                    >
                      Mark as Rejected
                    </button>
                  </div>
                </div>

                <div className="col-md-3 row mt-3">
                  <input type="checkbox" className="col-md-2"
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
              {afterloadProgram?.map((data, key) => (
                <tr onClick={()=>{rowSelectMtrlTable(data,key)}} className={key===selectedMtrlTable?.index? 'selcted-row-clr':'' }>
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
                    <input
                    
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}
      <div>
      {
        showusedModal && (
          <ShowUsedModal 
          showusedModal={showusedModal}
          setShowusedModal={setShowusedModal}
          filterUnusedData={filterUnusedData}
          />
        )
      }

      {
        allModal && 
        (
          <ShowAllModal
          allModal={allModal}
          setAllModal={setAllModal}
          resetData={resetData}
          />
        )
      }

      {
        MarkasUsed && (
          <MarkAsUsedModal
          MarkasUsed={MarkasUsed}
          setMarkasUsed={setMarkasUsed}
          handleMarkasUsed={handleMarkasUsed}
          />
        )
      }
      </div>
    </div>
  );
}
