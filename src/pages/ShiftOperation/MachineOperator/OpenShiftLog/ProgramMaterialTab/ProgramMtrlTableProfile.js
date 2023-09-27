import React from 'react';
import { Table } from 'react-bootstrap';

export default function ProgrmMatrlTableService() {
  return (
    <div>
      <div className='mt-2 col-md-12 col-sm-12' style={{ overflow:"scroll",
       height: '230px', 
     }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor table-space" style={{fontSize:'13px'}}>
              <tr>
                
              <th>Material ID</th>
              <th>Length</th>
              <th>Width</th>
              <th>Used</th>
              <th>Rejected</th>
              <th>Rejection Reason</th>

              </tr>
            </thead>

                  <tbody className='tablebody' style={{fontSize:'13px'}}>
                    <tr >
                    
                      
                      <td></td>
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

