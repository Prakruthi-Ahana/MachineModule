import React from 'react';
import { Table } from 'react-bootstrap';

export default function ShiftSummryTable() {
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

                  <tbody className='tablebody'>
                    <tr >
                    
                      
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
