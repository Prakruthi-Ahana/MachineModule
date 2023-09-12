import React from 'react'
import { Table } from "react-bootstrap";

export default function MachineTaskProfile() {
  return (
   
    <div
    className="col-md-12"
    style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
  >
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor" style={{ fontSize: "12px" }}>
        <tr>
          <th></th>
          <th style={{ whiteSpace: "nowrap" }}>Shape Id</th>
          <th>Dim 1</th>
          <th>Dim 2</th>
          <th>Used</th>
          <th>Reject</th>
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
