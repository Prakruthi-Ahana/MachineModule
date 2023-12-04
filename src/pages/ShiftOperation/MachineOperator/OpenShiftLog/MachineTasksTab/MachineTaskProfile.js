import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import { baseURL } from '../../../../../api/baseUrl';
import { useState } from 'react';

export default function MachineTaskProfile({selectedProgram,machineTaskData,machinetask,setIsDataDisplayed}) {

  return (
    <div
    className="col-md-12 mt-2"
    style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
  >
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor" style={{ fontSize: "12px" }}>
        <tr>
         
          <th style={{ whiteSpace: "nowrap" }}>Shape Id</th>
          <th>Length</th>
          <th>Width</th>
          <th>Used</th>
          <th>Reject</th>
        </tr>
      </thead>

      <tbody className="tablebody table-space" style={{ fontSize: "12px" }}>
      {machineTaskData.map((data,key) => (
        <tr className={key===selectedProgram?.index? 'selcted-row-clr':'' }>
          <td>{data.ShapeMtrlID}</td>
          <td>{data.Para1}</td>
          <td>{data.Para2}</td>
          <td><input type='checkbox'
          checked={data.Used===1}
          /></td>
          <td><input type='checkbox'
            checked={data.Rejected===1}
          /></td>
        </tr>
      ))}
      </tbody>
    </Table>
  </div>
 
  )
}
