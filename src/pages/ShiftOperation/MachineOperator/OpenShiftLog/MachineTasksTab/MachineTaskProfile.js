import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Table } from "react-bootstrap";
import { toast } from 'react-toastify';
import { baseURL } from '../../../../../api/baseUrl';
import { useState } from 'react';

export default function MachineTaskProfile(selectedProgram) {

  const [machineTaskData , setMachineTaskData] = useState([])
 

  console.log(selectedProgram.selectedProgram.Ncid);

  const machinetask =()=>{
    axios.post(baseURL + "/ShiftOperator/MachineTasksProfile", {NCId:selectedProgram.selectedProgram.Ncid
    }).then((response) => {
      console.log(response.data)
      setMachineTaskData(response.data)
   })

  }
  
  console.log(selectedProgram.Ncid)
  useEffect(() => {
      machinetask(); 
  }, [ selectedProgram]);
  console.log("Testing", machineTaskData)



  return (
   
    <div
    className="col-md-12 mt-2"
    style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
  >
    <Table striped className="table-data border">
      <thead className="tableHeaderBGColor" style={{ fontSize: "12px" }}>
        <tr>
         
          <th style={{ whiteSpace: "nowrap" }}>Shape Id</th>
          <th>Dim 1</th>
          <th>Dim 2</th>
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
          <td>{data.Used}</td>
          <td>{data.Rejected}</td>
        </tr>
      ))}
      </tbody>
    </Table>
  </div>
 
  )
}
