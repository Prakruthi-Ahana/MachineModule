import React from 'react';
import { Table } from 'react-bootstrap';

export default function ProgramPartsForm() {
  return (
    <div>
       <div className='mt-2'>
        <div className="col-md-12 col-sm-12" >
          <div className="ip-box form-bg " >

<div>
    <h6>NC Program Parts Production Details</h6>
</div>
            <div className="row" >
              
             
             
            
             
              <div style={{textAlign:"center"}} className='col-md-6'>
            <div>
            <button className="button-style mt-2 group-button mt-4 mb-2"
              style={{ width: "80px",fontSize:"14px"}} 
                >
              Save
            </button>
            </div>
           
            
            </div>

            <div style={{textAlign:"center"}} className='col-md-6'>
            <div>
            <button className="button-style mt-2 group-button mt-4 mb-2"
              style={{ width: "80px",fontSize:"14px"}} 
                >
              Show Dxf
            </button>
            </div>
           
            
            </div>

          

            </div>
          </div>

         
        </div>
    </div>



    <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px',  }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor" style={{fontSize:'12px', }}>
              <tr>
                
               
                <th ></th>
                <th >Part Name </th>
                <th >Total Nested</th>
                <th >Processed</th>
                <th >Rejected</th>
                <th >Remarks</th>
                
               

                

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
