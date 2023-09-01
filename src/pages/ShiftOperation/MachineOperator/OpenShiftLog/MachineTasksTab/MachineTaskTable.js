import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import LoadProgramModal from './LoadProgramModal';

export default function MachineTaskTable() {
  const [open, setOpen]=useState(false);
  const openModal=()=>{
    setOpen(true);
  }
  return (
    <>
    
      { 
      // open && 
      <  LoadProgramModal open={open} setOpen={setOpen}/>
      }
    
    <div>
      <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px',  }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor" style={{fontSize:'12px'}}>
              <tr>
                
               
                <th></th>
                <th style={{whiteSpace:'nowrap'}}>Program No</th>
                <th style={{whiteSpace:'nowrap'}}>Task No</th>
                <th>Operation</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Allotted</th>
                <th>Process</th>

              </tr>
            </thead>

                  <tbody className='tablebody'>
                    <tr >
                    
                      
                      <td></td>
                      <td></td>
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

<div className='row'>
    
    <div className=' mt-2 col-md-6'>
       
       <div style={{textAlign:"",backgroundColor:"#d3d3d3",
      marginLeft:"0px",fontSize:"14px",height:'230px'}}
       >
          <p style={{color:"",marginLeft:'50px'}}><b>Program Info </b></p>

          <div style={{textAlign:"",marginLeft:'70px'}}>
            
            <button className="button-style  group-button mt-2 mb-2"
              style={{ width: "100px",fontSize:"14px",marginLeft:'-12px'}} 
              onClick={openModal}  >
             Load Program
            </button>
            
           
            
            </div>
            

          <div className='mt-1' style={{color:"",marginLeft:'20px'}}> <b>Program No :  </b></div>
          
          
          <div  className='mt-1' style={{color:"",marginLeft:'20px'}}><b>Process :</b></div>
           <div className='mt-1' style={{color:"",marginLeft:'20px'}}><b>Operation :</b></div>
           <div  className='mt-1'style={{color:"",marginLeft:'20px'}}> <b>To Process :  </b></div>
          
           <div  className='mt-1'style={{color:"",marginLeft:'20px'}}> <b>Processed:  </b></div>   
         
        </div>
    </div>




    <div className=' mt-2 col-md-6' style={{}}>
       
       <div style={{textAlign:"",backgroundColor:"#d3d3d3",
        marginTop:"2px",marginLeft:"2px",fontSize:"14px",height:'230px'}}
       >




        
          <p style={{color:"",marginLeft:'50px'}}> <b>Material Info </b></p>

          <div style={{color:"",marginLeft:'20px'}}> <b>Customer:  </b></div>
          
           <div style={{color:"",marginLeft:'20px'}}><b>Code:</b></div>
           <div style={{color:"",marginLeft:'20px'}}> <b>Source :  </b></div>
          
           <div style={{color:"",marginLeft:'20px'}}><b>Length :</b></div>
           <div style={{color:"",marginLeft:'20px'}}> <b>Width :  </b></div>
          
           <div style={{color:"",marginLeft:'20px'}}><b>Remarks :</b></div>

           <div style={{color:"",marginLeft:'20px'}}><b>Drawings:</b></div>
           <div style={{color:"",marginLeft:'20px'}}> <b>Total Parts:  </b></div>
          
           <div style={{color:"",marginLeft:'20px'}}><b>Machine Time :</b></div>
        </div>
    </div>


    </div>


    
    <div className='mt-2'>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row">
              <div className="col-md-4">
                <label className="form-label" style={{fontSize:"12px"}} > IV No :</label>
                
              </div>
              <div className="col-md-4">
                <label className="form-label" style={{fontSize:"12px"}}> Issue Date :</label>
                
              </div>
             
              <div className="col-md-4">
                <label className="form-label" style={{fontSize:"12px"}}> Sets Issued :</label>
                
                
              </div>
             
            
             
             

            </div>
          </div>

         
        </div>
    </div>



    <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px',  }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor"  style={{fontSize:"12px"}}>
              <tr>
                
               
                <th></th>
                <th style={{whiteSpace:'nowrap'}}>Part Id</th>
                <th>Rv_No</th>
                <th>Qty Issued</th>
                <th>Qty Used</th>
                <th>Qty Returned</th>
               

              </tr>
            </thead>

                  <tbody className='tablebody' style={{fontSize:"12px"}}>
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
    </>
  );
}
