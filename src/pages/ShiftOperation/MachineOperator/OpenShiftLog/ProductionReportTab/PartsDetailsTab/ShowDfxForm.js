import axios from "axios";
import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../../api/baseUrl";
import { useGlobalContext } from "../../../../../../Context/Context";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function ShowDfxForm({ openTable,selectProductionReport }) {
  const { NcId,partDetailsData, setPartDetailsData} = useGlobalContext();


  const getPartDetails = () => {
    console.log("selectProductionReport",selectProductionReport);
    axios
      .post(baseURL + "/ShiftOperator/getpartDetails", {
        selectProductionReport,
      })
      .then((response) => {
        console.log(response.data);
        setPartDetailsData(response.data);
      });
  };

  // console.log(NcId)
  useEffect(() => {
    getPartDetails();
  }, [selectProductionReport]);

  const [partDetailsRowSelect, setPartDetailsRowSelect] = useState({});
  const selectRowPartsDetails = (item, index) => {
    let list = { ...item, index: index };
    setPartDetailsRowSelect(list);
  };

  useMemo(() => {
    setPartDetailsRowSelect({ ...partDetailsData[0], index: 0 });
  }, [partDetailsData[0]]);

  const onChnageReject = (e, key, valueQtyRejected) => {
    const updatedRow = { ...partDetailsRowSelect };
    updatedRow.QtyRejected = e.target.value;
    setPartDetailsRowSelect(updatedRow);
  };

  const remarksChange = (e, key, valueRemarks) => {
    const updatedRow = { ...partDetailsRowSelect };
    updatedRow.Remarks = e.target.value;
    setPartDetailsRowSelect(updatedRow);
  };

  const savePartDetails = () => {
    console.log(partDetailsRowSelect);
    axios
      .post(baseURL + "/ShiftOperator/SaveprogramDetails", {
        partDetailsRowSelect,
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
     const dataCopy = [...partDetailsData];
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
      <div className="form-bg ">
        <div
          className="row mb-3"
          style={{ marginLeft: "-5px", marginTop: "-15px" }}
        >
          <div
            className="col-md-6"
            style={{ textAlign: "center", marginLeft: "-12px" }}
          >
            <button
              className="button-style group-button"
              style={{ fontSize: "13px", width: "80px", marginTop: "10px" }}
              onClick={savePartDetails}
            >
              Save
            </button>
          </div>

          <div style={{ textAlign: "center" }} className="col-md-6">
            <button
              className="button-style group-button"
              style={{ fontSize: "13px", width: "80px", marginTop: "10px" }}
            >
              Show Dfx
            </button>
          </div>
        </div>
      </div>

      {openTable ? (
        <div
          className="col-md-12 "
          style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
        >
          <Table striped className="table-data border table-space">
            <thead className="tableHeaderBGColor" style={{ fontSize: "13px" }}>
              <tr>
                <th></th>
                <th onClick={() => requestSort("DwgName")}>Dwg Name</th>
                <th onClick={() => requestSort("TotQtyNested")}>Total Nested</th>
                <th onClick={() => requestSort("QtyCut")}>Produced</th>
                <th onClick={() => requestSort("QtyRejected")}>Rejected</th>
                <th onClick={() => requestSort("Remarks")}>Remarks</th>
              </tr>
            </thead>

            <tbody
              className="tablebody table-space"
              style={{ fontSize: "13px" }}
            >
              {partDetailsData.length === 0 ? (
                <tr>
                  <td colSpan="6">No data to show</td>
                </tr>
              ) : (
                sortedData().map((value, key) => (
                  <tr
                    key={key}
                    onClick={() => {
                      selectRowPartsDetails(value, key);
                    }}
                    className={
                      key === partDetailsRowSelect?.index
                        ? "selcted-row-clr"
                        : ""
                    }
                  >
                    <td></td>
                    <td>{value?.DwgName}</td>
                    <td>{value?.TotQtyNested}</td>
                    <td>{value?.QtyCut}</td>
                    <td>
                      <input
                        className="table-cell-editor"
                        defaultValue={value?.QtyRejected}
                        onChange={(e) =>
                          onChnageReject(e, key, value.QtyRejected)
                        }
                      />
                    </td>
                    <td>
                      <input
                        className="table-cell-editor"
                        defaultValue={value?.Remarks}
                        onChange={(e) => remarksChange(e, key, value.Remarks)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
