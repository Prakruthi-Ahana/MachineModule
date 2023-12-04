import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import MarkasRejectedModal from "./MarkasRejectedModal";
import RowRejectedModal from "./RowRejectedModal";
import ShowUnusedModal from "./ShowUnusedModal";
import AllModal from "./AllModal";
import axios from "axios";
import { baseURL } from "../../../../../../api/baseUrl";
import { toast } from "react-toastify";
import RejectModal from "./RejectModal";
// import AltModal from '../../../AltModal';

export default function LaserCutForm({ selectProductionReport, openTable,selectshifttable}) {
  //  const[showModal,setShowModal]=useState(false);
  const [markasRejected, setMarkasRejected] = useState(false);
  const [rowsRejected, setRowsRejected] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleRejectModal = () => {
    setRowsRejected(true);
  };

  const handlemarkasUsed = () => {
    setMarkasRejected(true);
  };

  // console.log("Laser Data", selectProductionReport);

  const selectProductionReportData = selectProductionReport?.Ncid;
  const [showUnused, setShowUnused] = useState(false);
  const [ProductionReportData, setProductionReportData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [allModal, setAllModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const [isDataFiltered, setIsDataFiltered] = useState(false);

  const filterUnusedData = () => {
    const filteredData = ProductionReportData.filter(
      (data) => data.Used === 0 && data.Rejected === 0
    );
    setOriginalData(ProductionReportData); // Save the original data
    setProductionReportData(filteredData); // Update the filtered data
    setIsDataFiltered(true); // Set the flag to indicate data is filtered
  };
  const resetData = () => {
    setProductionReportData(originalData); // Restore the original data
    setIsDataFiltered(false); // Clear the data filtered flag
  };

  const handleCheckBox = () => {
    setChecked(!checked);
    if (checked) {
      setAllModal(true);
    } else {
      setShowUnused(true);
    }
  };


  const MaterialUsage = () => {
    axios
      .post(baseURL + "/ShiftOperator/MachineTasksProfile", {
        NCId: selectProductionReportData,
      })
      .then((response) => {
        console.log(response);
        setProductionReportData(response.data);
      });
  };
  
  useEffect(() => {
    MaterialUsage();
  }, [selectProductionReport]);

  const [selectdefaultRow, setSelectdefaultRow] = useState({});

  const initialRowSelection = (item, index) => {
    setSelectdefaultRow({ ...item, index });
  };
  useMemo(() => {
    setSelectdefaultRow({ ...selectProductionReport[0], index: 0 });
  }, [selectProductionReport[0]]);

  const handleMarkasUsed = () => {
    axios
      .post(baseURL + "/ShiftOperator/markAsUsedProductionReport", {
        selectdefaultRow,
        selectedMachine:selectshifttable?.Machine
      })
      .then(() => {
        console.log(selectdefaultRow);
        axios
        .post(baseURL + "/ShiftOperator/MachineTasksProfile", {
          NCId: selectProductionReportData,
        })
        .then((response) => {
          console.log(response);
          setProductionReportData(response.data);
        });
        MaterialUsage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [RejecteReasonFun, setRejectReasonFun] = useState({});

  const onChangefield = (key, e) => {
    const { value } = e.target;
    setRejectReasonFun((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const valueSepertor = Object.values(RejecteReasonFun);
  const newReason = valueSepertor.join(" ");


  const UpdateRejectedReason = () => {
    if (
      !Object.values(RejecteReasonFun).some((reason) => reason.trim() !== "")
    ) {
      toast.error("Rejected Reason is empty", {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Prevent further execution if the reason is empty
    }
    axios
    .post(baseURL + "/ShiftOperator/markAsRejectedProductionReport", {
      selectdefaultRow,
      RejectedReason: newReason,
    })
    .then(() => {
      console.log("RejectReason Posted");
      toast.success("Rejected Reason Saved", {
        position: toast.POSITION.TOP_CENTER,
      });
      MaterialUsage();
    })
    .catch((err) => {
      toast.error("An error occurred while updating reject reason", {
        position: toast.POSITION.TOP_CENTER,
      });
    });
  };

  

  return (
    <div>
      <div className="mt-2">
        {openTable ? (
          <div className="col-md-12 col-sm-12">
            <div className="ip-box form-bg ">
              <div className="row" style={{ gap: "10px", marginLeft: "-5px" }}>
                <div
                  style={{ textAlign: "center", marginLeft: "-12px" }}
                  className="col-md-3"
                >
                  <div>
                    <button
                      className="button-style mt-2 group-button mt-4 mb-2"
                      style={{ width: "110px", fontSize: "13px" }}
                      onClick={handlemarkasUsed}
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
                      onClick={handleRejectModal}
                    >
                      Mark as Rejected
                    </button>
                  </div>
                </div>

                <div className="col-md-3 row mt-3">
                  <input
                    type="checkbox"
                    className="col-md-2"
                    onChange={handleCheckBox}
                  />
                  <label
                    className="form-label col-md-1 mt-1"
                    style={{ whiteSpace: "nowrap", marginLeft: "-6px" }}
                  >
                    <b>show unused</b>
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="col-md-12">
        {openTable ? (
          <div
            style={{
              overflowY: "scroll",
              overflowX: "scroll",
              height: "250px",
            }}
          >
            <Table striped className="table-data border">
              <thead
                className="tableHeaderBGColor table-space"
                style={{ fontSize: "12px" }}
              >
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>Material Id</th>
                  <th>Length</th>
                  <th>width</th>
                  <th>Used</th>
                  <th>Rejected</th>
                  <th style={{ whiteSpace: "nowrap" }}>Rejection Reason</th>
                </tr>
              </thead>
              <tbody className="tablebody table-space">
                {ProductionReportData?.map((data, key) => (
                  <tr
                    onClick={() => {
                      initialRowSelection(data, key);
                    }}
                    className={
                      key === selectdefaultRow?.index ? "selcted-row-clr" : ""
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
                          value={RejecteReasonFun[key] || ""} // Bind to the specific state for this row
                          onChange={(e) => onChangefield(key, e)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : null}
      </div>

        <MarkasRejectedModal
          markasRejected={markasRejected}
          setMarkasRejected={setMarkasRejected}
          handleMarkasUsed={handleMarkasUsed}
          selectProductionReportData={selectProductionReportData}
          setProductionReportData={setProductionReportData}
        />

        <RowRejectedModal
          rowsRejected={rowsRejected}
          setRowsRejected={setRowsRejected}
        />
      

      
        <ShowUnusedModal
          showUnused={showUnused}
          setShowUnused={setShowUnused}
          filterUnusedData={filterUnusedData}
        />
      
      
        <RejectModal
          rowsRejected={rowsRejected}
          setRowsRejected={setRowsRejected}
          handleRejectedRow={UpdateRejectedReason}
        />
    

      <AllModal
        allModal={allModal}
        setAllModal={setAllModal}
        resetData={resetData}
      />
    </div>
  );
}
