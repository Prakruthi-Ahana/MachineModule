import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";


export default function ShiftSummryTable({selectshifttable}) {
  const[shiftSummaryData,setShiftSummaryData]=useState([])
  const getShiftSummaryData = () => {
    axios
      .post(baseURL + "/ShiftOperator/ShiftSummary",{selectshifttable})
      .then((response) => {
        console.log(response.data);
        setShiftSummaryData(response.data);
      })
  };

  useEffect(()=>{
    getShiftSummaryData();
  },[selectshifttable])


  return (
    <div>
      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor" style={{ fontSize: "12px" }}>
            <tr>

              <th style={{ whiteSpace: "nowrap" }}>Head</th>
              <th style={{ whiteSpace: "nowrap" }}>Time Hours</th>
              <th style={{ whiteSpace: "nowrap" }}>Time in Min</th>
            </tr>
          </thead>

          <tbody className="tablebody">

            {shiftSummaryData.map((item,key)=>{
              return(
                <>
                <tr>
              <td>{item?.Head}</td>
              <td>{item?.TimeinMin}</td>
              <td>{item?.TimeinMin}</td>
            </tr>
                </>
              )
            })}

          </tbody>
        </Table>
      </div>
    </div>
  );
}
