import React, { useMemo, useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";
import "react-toastify/dist/ReactToastify.css";

export default function ProgramPartsForm() {
  const {
    NcId,
    programPartsData,
    setProgramPartsData,
    formdata,
    tubeCuttingModal,
    setTubeCuttingModal,
  } = useGlobalContext();

  const [programPatsSelectedRow, setProgramPatsSelectedRow] = useState({});

  const getProgramParts = () => {
    axios
      .post(baseURL + "/ShiftOperator/getprogramParts", {
        NcId: formdata?.Ncid,
      })
      .then((response) => {
        setProgramPartsData(response.data);
      });
  };

  useEffect(() => {
    getProgramParts();
  }, [formdata?.Ncid]);

  const selectRowProgramParts = (item, index) => {
    let list = { ...item, index: index };
    setProgramPatsSelectedRow(list);
  };


 //OnChange Inputfielda
  const onChangeField = (index, field, value) => {
    const updatedProgramPartsData = [...programPartsData];
    const row = updatedProgramPartsData[index];

    // Validation logic
    const totalQty = row.QtyNested * row.Sheets;
    const processed = parseInt(row.QtyCut || 0, 10);
    const rejected = parseInt(row.QtyRejected || 0, 10);

    // Maximum allowed for processnow: totalQty - (processed + rejected)
    const maxProcessNow = totalQty - (processed + rejected);

    const ToReject=totalQty-row.QtyCut;

   

    if (field === "processnow") {
      let processnow = parseInt(value, 10) || 0;

      // If the entered processnow exceeds the allowed maximum, set it to the maximum allowed
      if (processnow > maxProcessNow) {
        toast.error(`Process Now cannot exceed ${maxProcessNow}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        processnow = maxProcessNow; // Set to maximum allowed
      }

      // Update the specific item's field with the new value
      updatedProgramPartsData[index] = {
        ...updatedProgramPartsData[index],
        [field]: processnow,
      };
      setProgramPartsData(updatedProgramPartsData);
    } else {
      // Update other fields directly
      updatedProgramPartsData[index] = {
        ...updatedProgramPartsData[index],
        [field]: value,
      };
      setProgramPartsData(updatedProgramPartsData);
    }
  };


  //Save Changes
  const SaveProgramParts = () => {
    // const hasErrors = programPartsData.some((item) => {
    //   return item.QtyRejected > 0 && item.Remarks==='null' || null ;
    // });
    const hasErrors = programPartsData.some((item) => {
      console.log("item is",item);
      const isInvalidRemark =
        !item.Remarks || item.Remarks.trim() === "" || item.Remarks === "null";
      if (item.QtyRejected > 0 && isInvalidRemark) {
        return true; 
      }
      return false; 
    });
  
    if (hasErrors) {
      // Show error message and stop the function
      toast.error("Please provide remarks for rejection", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
  
    // Create a new array with updated QtyCut and reset processnow to 0
    const updatedProgramPartsData = programPartsData.map((item) => {
      return {
        ...item,
        QtyCut: parseInt(item.QtyCut || 0) + parseInt(item.processnow || 0),
        processnow:0
      };
    });
  
    // Set the updated data in state
    setProgramPartsData(updatedProgramPartsData);

    // Make the API call with the updated data
    axios
      .post(baseURL + "/ShiftOperator/SaveprogramParts", {
        programPartsData: updatedProgramPartsData,
      })
      .then((response) => {
        toast.success("Data Saved Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log("error",error);
      });
  };

  
  // Sorting logic
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...programPartsData];
    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

  return (
    <div>
      <div className="col-md-12 col-sm-12">
        <div className="form-bg">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-md-6">
              <label className="form-label">
                NC Program Parts Production Details
              </label>
            </div>
            <div
              className="col-md-6"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button
                className="button-style mt-2 group-button mb-1"
                onClick={SaveProgramParts}
              >
                Save
              </button>
              {!tubeCuttingModal ? (
                <button className="button-style mt-2 group-button mb-1 ml-2">
                  Show Dxf
                </button>
              ) : (
                <button
                  className="button-style mt-2 group-button mb-1 ml-2"
                  onClick={(e) => setTubeCuttingModal(false)}
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border table-space">
          <thead className="tableHeaderBGColor">
            <tr>
              <th onClick={() => requestSort("DwgName")}>Part Name</th>
              <th onClick={() => requestSort("TotQtyNested")}>Total Nested</th>
              <th onClick={() => requestSort("QtyCut")}>Processed</th>
              {tubeCuttingModal ? (
                <>
                  <th onClick={() => requestSort("QtyRejected")}>
                    Process Now
                  </th>
                  <th onClick={() => requestSort("Total Processed")}>
                    Total Processed
                  </th>
                </>
              ) : null}
              <th onClick={() => requestSort("QtyRejected")}>Rejected</th>
              <th onClick={() => requestSort("Remarks")}>Remarks</th>
            </tr>
          </thead>
          <tbody className="tablebody table-space">
            {sortedData().map((value, key) => (
              <tr
                key={key}
                onClick={() => selectRowProgramParts(value, key)}
                className={
                  key === programPatsSelectedRow?.index ? "selcted-row-clr" : ""
                }
              >
                <td>{value.DwgName}</td>
                <td>{value.QtyNested * value.Sheets}</td>
                <td>{value.QtyCut}</td>
                {tubeCuttingModal ? (
                  <>
                    <td>
                      <input
                        className="table-cell-editor"
                        value={value.processnow || 0}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          onChangeField(key, "processnow", newValue);
                        }}
                        onBlur={(e) => {
                          const newValue = parseInt(e.target.value, 10) || 0;
                          const maxProcessNow =
                            value.QtyNested * value.Sheets -
                            (value.QtyCut + value.QtyRejected);
                          if (newValue > maxProcessNow) {
                            e.target.value = maxProcessNow;
                            onChangeField(key, "processnow", maxProcessNow);
                          }
                        }}
                      />
                    </td>

                    <td>
                      {parseInt(value.QtyCut || 0) +
                        parseInt(value.processnow || 0)}
                    </td>
                  </>
                ) : null}
                <td>
                  <input
                    className="table-cell-editor"
                    value={value.QtyRejected}
                    onChange={(e) =>
                      onChangeField(key, "QtyRejected", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    className="table-cell-editor"
                    value={value.Remarks ==='null' ? null : value.Remarks}
                    onChange={(e) =>
                      onChangeField(key, "Remarks", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
