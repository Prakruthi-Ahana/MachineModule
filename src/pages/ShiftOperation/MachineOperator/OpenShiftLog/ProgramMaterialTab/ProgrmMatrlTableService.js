import React from 'react';
import { Table } from 'react-bootstrap';

export default function ProgrmMatrlTableService() {
  return (
    <div>
    <div className='mt-2'>
    <div className="col-md-12 col-sm-12">
      <div className="ip-box form-bg " >
        <div className="row">
          <div className="col-md-6 " style={{marginTop:'-10px'}} >
            <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}> IV No :</label>
            
          </div>
          <div className="col-md-6  " style={{marginTop:'-10px',marginLeft:'-15px'}}>
            <label className="form-label" style={{fontSize:'12px' }}> Issue Date :</label>
            
          </div>
         
          <div className="col-md-6" style={{marginTop:'-10px',marginLeft:'-15px'}}>
            <label className="form-label" style={{fontSize:'12px'}}> Sets Issued :</label>
           
            
          </div>
         
          <div className="col-md-6" style={{marginTop:'-10px'}}>
            <label className="form-label" style={{fontSize:'12px'}}> Used :</label>
           
            
          </div>

          <div className="col-md-6 " style={{marginTop:'-10px',marginLeft:'-15px'}}>
            <label className="form-label" style={{fontSize:'12px'}}> Sets Issued : </label>
            <input  className='in-field' style={{marginTop:'4px'}} />
            
          </div>
         
          
         
         <div className='row'>
          <div style={{textAlign:"center", marginTop:'-14px'}} className='col-md-6'>
        <div>
        <button className="button-style mt-2 group-button mt-4 mb-2"
          style={{ width: "100px",fontSize:"14px"}} onClick={handleSubmit}
            >
          Mark as Used
        </button>
        </div>
       
        
        </div>

        </div>
        </div>
      </div>

     
    </div>
</div>
      <div className='mt-2 col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll',
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
                     <td></td>
                     
                    </tr>
                  </tbody>
          </Table>

        </div >
    </div>
  );
}
