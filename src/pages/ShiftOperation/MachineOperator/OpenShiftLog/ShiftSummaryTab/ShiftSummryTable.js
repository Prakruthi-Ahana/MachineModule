import React from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { baseURL } from '../../../../../api/baseUrl';
import axios from 'axios';
import { useState } from 'react';

export default function ShiftSummryTable({selectshifttable}) {

  const[shiftSummaryTab,setshiftSummaryTab]=useState([])


  const getShiftLogDetails=()=>{
    axios
    .post(baseURL + "/ShiftOperator/ShiftSummary", {
      selectshifttable:selectshifttable
    })
    .then((response) => {
      console.log(response.data);
      setshiftSummaryTab(response.data)
    });
  }

  useEffect(()=>{
    getShiftLogDetails();
  },[selectshifttable])



  
  return (
    <div>
       <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px',  }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor" style={{fontSize:'12px'}}>
              <tr>

                <th></th>
                <th style={{whiteSpace:'nowrap'}}>Head</th>
                <th style={{whiteSpace:'nowrap'}}>Time Hours</th>
                <th style={{whiteSpace:'nowrap'}}>Time in Min</th>
              </tr>
            </thead>

                
          </Table>

        </div >
    </div>
  );
}
