import React, { useState } from 'react';
import { Table } from 'react-bootstrap';


export default function MarkAsUsedForm() {

  
  return (
    <div>
      <div className='mt-2'>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg " >
            <div className="row" style={{gap:'10px',marginLeft:'-5px'}}>
              
             
             
            
             
              <div style={{textAlign:"center",marginLeft:'-12px'}} className='col-md-3'>
            <div>
            <button className="button-style mt-2 group-button mt-4 mb-2"
              style={{ width: "90px",fontSize:"13px"}} 
                >
              Mark as Used
            </button>
            </div>
           
            
            </div>

            <div style={{textAlign:"center"}} className='col-md-4'>
            <div>
            <button className="button-style mt-2 group-button mt-4 mb-2"
              style={{ width: "110px",fontSize:"13px"}} 
                >
              Mark as Rejected
            </button>
            </div>
           
            
            </div>

            <div className="col-md-3 row mt-3">
                <input type='checkbox' className='col-md-2'/>
                <label className="form-label col-md-1 mt-1" style={{whiteSpace:'nowrap',marginLeft:'-6px'}}><b>show unused</b> </label>
              </div>

            </div>
          </div>

         
        </div>
    </div>



    <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px',  }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor " style={{fontSize:'12px'}}>
              <tr>
                
               
                <th></th>
                <th style={{whiteSpace:'nowrap'}}>Material Id</th>
                <th>Length</th>
                <th>width</th>
                <th>Used</th>
                <th>Rejected</th>
                <th style={{whiteSpace:'nowrap'}}>Rejection Reason</th>
               

                

              </tr>
            </thead>

                  <tbody className='tablebody'>
                    <tr >
                    
                      
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                     
                     
                    </tr>
                  </tbody>
          </Table>

        </div >
       
    </div>
  );
}
