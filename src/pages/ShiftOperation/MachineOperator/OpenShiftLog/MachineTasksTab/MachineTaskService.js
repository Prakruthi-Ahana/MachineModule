import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import { Table } from "react-bootstrap";

export default function MachineTaskService({
  machineTaskService,
  servicetopData,
}) {

  const [rowselectMachineTaskService, setRowSelectMachineTaskService] =
    useState({});
  const rowSelectMTService = (item, index) => {
    let list = { ...item, index: index };
    setRowSelectMachineTaskService(list);
  };

  useMemo(() => {
    // console.log("afterRefreshData[0]:", afterRefreshData[0]);
    setRowSelectMachineTaskService({ ...machineTaskService[0], index: 0 });
  }, [machineTaskService[0]]);

  // Function to format the date to "dd/mm/yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getDate()) || isNaN(date.getMonth() + 1) || isNaN(date.getFullYear())) {
      return null; // Return null if any date component is NaN
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  

  return (
    <div>
      <div className="mt-2">
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label" style={{ fontSize: "11px" }}>
                  IV No :{servicetopData[0]?.IV_No}
                </label>
              </div>
              <div className="col-md-4">
                <label className="form-label" style={{ fontSize: "11px",marginLeft:"-20px"}}>
                  Issue Date :{formatDate(servicetopData[0]?.Issue_date)}
                </label>
              </div>

              <div className="col-md-4">
                <label className="form-label" style={{ fontSize: "11px" }}>
                  Sets Issued :{servicetopData[0]?.QtyIssued}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border">
          <thead
            className="tableHeaderBGColor table-space"
            style={{ fontSize: "12px" }}
          >
            <tr>
              <th>Part Id</th>
              <th>Rv_No</th>
              <th>Qty Issued</th>
              <th>Qty Used</th>
              <th>Qty Returned</th>
            </tr>
          </thead>

          <tbody className="tablebody table-space" style={{ fontSize: "12px" }}>
            {machineTaskService.map((item, key) => {
              return (
                <>
                  <tr
                    onClick={() => {
                      rowSelectMTService(item, key);
                    }}
                    className={
                      key === rowselectMachineTaskService?.index
                        ? "selcted-row-clr"
                        : ""
                    }
                  >
                    {" "}
                    <td>{item.PartId}</td>
                    <td>{item.RV_No}</td>
                    <td>{item.QtyIssued}</td>
                    <td>{item.QtyUsed}</td>
                    <td>{item.QtyReturned}</td>
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
