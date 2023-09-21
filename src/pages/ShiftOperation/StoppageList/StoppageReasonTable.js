import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Table from "react-bootstrap/Table";


export default function StoppageReasonTable({selectedGroup,selectedReason,selectReasonFun,getReasonsList}) {
  console.log(selectedGroup)


useEffect(() => {
  if (getReasonsList.length > 0 && !selectedReason.Stoppage) {
    selectReasonFun(getReasonsList[0], 0); // Select the first row
  }
}, [getReasonsList, selectedReason, selectReasonFun]);

  return (
    <div className='row mt-1'>
    <div>
     <div style={{height:"430px",overflowY: "auto"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>SL NO</th>
           <th>Stoppage Reason</th>
      
         </tr>
       </thead>

        <tbody>
        {getReasonsList.length > 0 ? (
          getReasonsList.map((item, key) => {
            return (
              <>
                <tr onClick={()=>selectReasonFun(item,key)} 
                className={key===selectedReason?.index? 'selcted-row-clr':'' }>
                  <td>{key + 1}</td>
                  <td>{item?.Stoppage}</td>
                </tr>
              </>
            );
          })
        ) : (
          <tr>
            <td colSpan="2">No data available</td>
          </tr>
        )}
        
</tbody>



    
 </Table>
     </div>

 </div>
</div>
  )
}

