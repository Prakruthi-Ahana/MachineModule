import React from 'react';
import { Table } from 'react-bootstrap';

export default function ProgrmMatrlTableService({afterloadProgram}) {
  console.log(afterloadProgram)
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

            <tbody className="tablebody table-space" style={{ fontSize: "12px" }}>
      {afterloadProgram.map((data,key) => (
        <tr>
          <td>{data.ShapeMtrlID}</td>
          <td>{data.Para1}</td>
          <td>{data.Para2}</td>
          <td><input type='checkbox'
          checked={data.Used===1}
          /></td>
          <td><input type='checkbox'
            checked={data.Rejected===1}
          /></td>
          <td></td>
        </tr>
      ))}
      </tbody>
          </Table>

        </div >
    </div>
  );
}

