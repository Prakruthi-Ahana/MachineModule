import axios from "axios";
import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../api/baseUrl";
import { useEffect } from "react";
import { useGlobalContext } from "../../../../../Context/Context";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function ProgramPartsForm() {
  const { NcId,programPartsData, setProgramPartsData,formdata} = useGlobalContext();

  console.log(formdata?.Ncid)

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

  const [programPatsSelectedRow, setProgramPatsSelectedRow] = useState({});
  const selectRowProgramParts = (item, index) => {
    let list = { ...item, index: index };
    setProgramPatsSelectedRow(list);
  };

  useMemo(() => {
    setProgramPatsSelectedRow({ ...programPatsSelectedRow[0], index: 0 });
  }, [programPatsSelectedRow[0]]);

  const remarksChange = (e, key, valueRemarks) => {
    const updatedRow = { ...programPatsSelectedRow };
    updatedRow.Remarks = e.target.value;
    setProgramPatsSelectedRow(updatedRow);
  };

  const onChnageReject = (e, key, valueQtyRejected) => {
    const updatedRow = { ...programPatsSelectedRow };
    updatedRow.QtyRejected = e.target.value;
    setProgramPatsSelectedRow(updatedRow);
  };

  const onChangeProcessed = (e, key, valueQtyNested) => {
    // Create a copy of the programPatsSelectedRow
    const updatedRow = { ...programPatsSelectedRow };
    // Update the Processed property of the selected row
    updatedRow.QtyNested = e.target.value;
    setProgramPatsSelectedRow(updatedRow);
  };

  const SaveProgramParts = () => {
    axios
      .post(baseURL + "/ShiftOperator/SaveprogramParts", {
        programPatsSelectedRow,
      })
      .then((response) => {
        toast.success("Data Saved Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

   //sorting
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
      <div className="mt-2">
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div>
              <h6>NC Program Parts Production Details</h6>
            </div>
            <div className="row">
              <div style={{ textAlign: "center" }} className="col-md-6">
                <div>
                  <button
                    className="button-style mt-2 group-button mt-4 mb-2"
                    style={{ width: "80px", fontSize: "14px" }}
                    onClick={SaveProgramParts}
                  >
                    Save
                  </button>
                </div>
              </div>

              <div style={{ textAlign: "center" }} className="col-md-6">
                <div>
                  <button
                    className="button-style mt-2 group-button mt-4 mb-2"
                    style={{ width: "80px", fontSize: "14px" }}
                  >
                    Show Dxf
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border table-space">
          <thead className="tableHeaderBGColor" style={{ fontSize: "12px" }}>
            <tr>
              <th onClick={() => requestSort("DwgName")}>Part Name </th>
              <th onClick={() => requestSort("TotQtyNested")}>Total Nested</th>
              <th onClick={() => requestSort("QtyCut")}>Processed</th>
              <th onClick={() => requestSort("QtyRejected")}>Rejected</th>
              <th onClick={() => requestSort("Remarks")}>Remarks</th>
            </tr>
          </thead>

          <tbody className="tablebody table-space">
            {sortedData().map((value, key) => {
              return (
                <>
                  <tr
                    key={key}
                    onClick={() => {
                      selectRowProgramParts(value, key);
                    }}
                    className={
                      key === programPatsSelectedRow?.index
                        ? "selcted-row-clr"
                        : ""
                    }
                  >
                    <td>{value.DwgName}</td>
                    <td>{value.TotQtyNested}</td>
                    <td>
                      <input
                        className="table-cell-editor"
                        value={value.QtyCut}
                        onChange={(e) =>
                          onChangeProcessed(e, key, value.QtyCut)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="table-cell-editor"
                        defaultValue={value.QtyRejected || ""}
                        onChange={(e) =>
                          onChnageReject(e, key, value.QtyRejected)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="table-cell-editor"
                        defaultValue={value.Remarks || ""}
                        onChange={(e) => remarksChange(e, key, value.Remarks)}
                      />
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
