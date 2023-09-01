import React from 'react';
import { Table } from 'react-bootstrap';

export default function ShowDfxForm() {
  return (
    <div>
      <div className="form-bg " style={{}}  >
            <div className="row mb-3" style={{gap:'0px',marginLeft:'-5px',marginTop:'-15px'}}>
              <div className='col-md-6' style={{textAlign:"center",marginLeft:'-12px'}}>
                    <button className="button-style group-button"
                    style={{fontSize:"13px", width:'80px',  marginTop:'10px'}}>
                    Save
                    </button>
            </div>

            <div style={{textAlign:"center"}} className='col-md-6'>
                <button className="button-style group-button"
                style={{fontSize:"13px",width:'80px', marginTop:'10px'}} 
                    >
                Show Dfx
                </button>
            </div>

           

            </div>
          </div>



          <div className='col-md-12 ' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px', 
     }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor" style={{fontSize:'13px'}}>
              <tr>
                
               
                <th></th>
                <th style={{whiteSpace:'nowrap'}}>Dwg Name</th>
                <th style={{whiteSpace:'nowrap'}}>Total Nested</th>
                <th style={{whiteSpace:'nowrap'}}>Produced</th>
                <th style={{whiteSpace:'nowrap'}}>Rejected</th>
                <th style={{whiteSpace:'nowrap'}}>Remarks</th>
               

                

              </tr>
            </thead>

                  <tbody className='tablebody' style={{fontSize:'13px'}}>
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
