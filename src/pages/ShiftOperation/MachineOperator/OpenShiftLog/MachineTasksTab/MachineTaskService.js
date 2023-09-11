import React from 'react'
import { Table } from "react-bootstrap";

export default function MachineTaskService() {
  return (
   
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
  
  )
}
