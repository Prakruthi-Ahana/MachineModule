import React from 'react';
import { Table } from 'react-bootstrap';

export default function ProgrmMatrlTable() {
  return (
    <div>
      <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll',
       height: '250px', 
     }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor" style={{fontSize:'13px'}}>
              <tr>
                
               
                <th></th>
                <th>Part Id</th>
                <th>RV No</th>
                <th>Issued</th>
                <th>Used</th>
                <th>UsedNow</th>
               

                

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
