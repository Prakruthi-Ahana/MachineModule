import React from 'react';
import { Table } from 'react-bootstrap';

export default function ProgrmMatrlTableProfile({ afterloadProgram , showTable}) {

  
      return (
      <div>
{showTable  ? (
        <div className='mt-2'>
          <div className="col-md-12 col-sm-12">
            <div className="ip-box form-bg">
              <div className="row" style={{ gap: '10px', marginLeft: '-5px' }}>
                <div style={{ textAlign: 'center', marginLeft: '-12px' }} className='col-md-3'>
                  <div>
                    <button
                      className="button-style mt-2 group-button mt-4 mb-2"
                      style={{ width: '90px', fontSize: '13px' }}
                    >
                      Mark as Used
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }} className='col-md-4'>
                  <div>
                    <button
                      className="button-style mt-2 group-button mt-4 mb-2"
                      style={{ width: '110px', fontSize: '13px' }}
                    >
                      Mark as Rejected
                    </button>
                  </div>
                </div>

                <div className="col-md-3 row mt-3">
                  <input type='checkbox' className='col-md-2' />
                  <label className="form-label col-md-1 mt-1" style={{ whiteSpace: 'nowrap', marginLeft: '-6px' }}>
                    <b>Show unused</b>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
) : null}
{showTable  ? (
        <div className='mt-2 col-md-12 col-sm-12' style={{ overflow: 'scroll', height: '230px' }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor table-space" style={{ fontSize: '13px' }}>
              <tr>
                <th style={{ whiteSpace: "nowrap" }} >Material ID</th>
                <th>Length</th>
                <th>Width</th>
                <th>Used</th>
                <th>Rejected</th>
                <th>Rejection Reason</th>
              </tr>
            </thead>

            <tbody className="tablebody table-space" style={{ fontSize: '12px' }}>
              {afterloadProgram?.map((data, key) => (
                <tr key={key}>
                  <td>{data.ShapeMtrlID}</td>
                  <td>{data.Para1}</td>
                  <td>{data.Para2}</td>
                  <td>
                   
                      <input type='checkbox' checked={data.Used === 1} />
                   
                  </td>
                  <td>
                  
                      <input type='checkbox' checked={data.Rejected === 1} />
                   
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
) : null}
      
      </div>
    );
  }
