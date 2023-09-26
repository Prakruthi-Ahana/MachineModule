import React from 'react'
import { Table } from "react-bootstrap";

export default function MachineTaskService() {
  return (
<div>
    <div className="mt-2">
    <div className="col-md-12 col-sm-12">
      <div className="ip-box form-bg ">
        <div className="row">
          <div className="col-md-4">
            <label className="form-label" style={{ fontSize: "12px" }}>
              {" "}
              IV No :
            </label>
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ fontSize: "12px" }}>
              {" "}
              Issue Date :
            </label>
          </div>

          <div className="col-md-4">
            <label className="form-label" style={{ fontSize: "12px" }}>
              {" "}
              Sets Issued :
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
      <thead className="tableHeaderBGColor" style={{ fontSize: "12px" }}>
        <tr>
          <th></th>
          <th style={{ whiteSpace: "nowrap" }}>Part Id</th>
          <th>Rv_No</th>
          <th>Qty Issued</th>
          <th>Qty Used</th>
          <th>Qty Returned</th>
        </tr>
      </thead>

      <tbody className="tablebody" style={{ fontSize: "12px" }}>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  </div>
  </div>
  )
}
