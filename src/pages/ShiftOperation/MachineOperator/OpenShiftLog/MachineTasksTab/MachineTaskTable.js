import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import LoadProgramModal from './LoadProgramModal';
import axios  from 'axios';
import { baseURL } from '../../../../../api/baseUrl';


export default function MachineTaskTable({
  selectshifttable
}) {
  const [open, setOpen]=useState(false);
  const [getMachinetaskdata, setMachinetaskdata] = useState([]);
 
  const openModal=()=>{
    setOpen(true);
  }
  const getMachineTaskData = () => {
    axios.post(baseURL +'/ShiftOperator/MachineTasksData', {selectshifttable
    }).then((response) => {
     console.log(response.data);
     setMachinetaskdata(response.data)
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
  };

  useEffect(()=>{
    getMachineTaskData();
  },[])


  return (
    <>
    
      { 
     
      <  LoadProgramModal open={open} setOpen={setOpen}/>
      }
    
    <div>
      <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px',  }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor table-space" style={{fontSize:'12px'}}>
              <tr>
   
                <th >Program No</th>
                <th >Task No</th>
                <th>Operation</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Allotted</th>
                <th>Process</th>
                <th>Customer</th>
                <th>Remarks</th>


              </tr>
            </thead>

                  <tbody className='tablebody table-space'>
                  {getMachinetaskdata.map((data) => (
                    <tr >
                  
                      <td>{data.NCProgramNo}</td>
                      <td>{data.TaskNo}</td>
                      <td>{data.Operation}</td>
                      <td>{data.Mtrl_Code}</td>
                      <td>{data.Qty}</td>
                      <td>{data.QtyAllotted}</td>
                      <td>{data.QtyCut}</td>
                      <td>{data.cust_name}</td>
                      <td>{data.Remarks}</td>
                    </tr>
                    ))}    
                  </tbody>
          </Table>

        </div >
    </div>

<div className='d-flex '>
    
    <div className=' mt-2 col-md-6 '>
       
       <div style={{textAlign:"",backgroundColor:"#d3d3d3",
    fontSize:"14px",height:'230px'}}
       >
          <p style={{color:"", textAlign:"center"}}><b>Program Info </b></p>

          <div style={{textAlign:"center"}}>
            
            <button className="button-style  group-button mt-2 mb-2"
              style={{ width: "100px",fontSize:"14px", textAlign:"center"}} 
              onClick={openModal}  >
             Load Program
            </button>
            
           
            
            </div>
           <div  className='d-flex'>
          <div style={{width:"auto", textAlign:"right"}}>
          <div className='mt-1' style={{color:"",marginLeft:'10px'}}> <b>Program No : </b></div>
          <div  className='mt-1' style={{color:"",marginLeft:'10px'}}><b>Process :</b></div>
          <div className='mt-1' style={{color:"",marginLeft:'10px'}}><b>Operation :</b></div>
          <div  className='mt-1'style={{color:"",marginLeft:'10px'}}> <b>To Process :  </b></div>
          <div  className='mt-1'style={{color:"",marginLeft:'10px'}}> <b>Processed :  </b></div> 
          </div>  
          <div style={{width:"auto", textAlign:"left"}}>
          <div className='mt-1' style={{color:"",marginLeft:'10px'}}> <b> - </b></div>
          <div  className='mt-1' style={{color:"",marginLeft:'10px'}}><b> - </b></div>
          <div className='mt-1' style={{color:"",marginLeft:'10px'}}><b> - </b></div>
          <div  className='mt-1' style={{color:"",marginLeft:'10px'}}> <b> - </b></div>
          <div  className='mt-1' style={{color:"",marginLeft:'10px'}}> <b> - </b></div> 
          </div>  
          </div> 
         
        </div>
    </div>




    <div className=' mt-2 col-md-6 ms-1' >
       
       <div style={{textAlign:"",backgroundColor:"#d3d3d3",
        marginTop:"2px",fontSize:"14px",height:'auto'}}
       >

          <p style={{color:"", textAlign:"center"}}> <b>Material Info</b></p>

 <div className='d-flex'>
          <div style={{width:"auto", textAlign:"right"}}>
          <div style={{color:"",marginLeft:'10px'}}> <b>Customer:  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Code :</b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b>Source :  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Length :</b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b>Width :  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Remarks :</b></div>

           <div style={{color:"",marginLeft:'10px'}}><b>Drawings :</b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b>Total Parts :  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Machine Time :</b></div>
        </div>
        

        <div style={{width:"auto", textAlign:"left"}}>
          <div style={{color:"",marginLeft:'10px'}}> <b> - </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b> - </b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b> - </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b> - </b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b> - </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b> - </b></div>

           <div style={{color:"",marginLeft:'10px'}}><b> - </b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b> - </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b> - </b></div>
        </div>
        </div>
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
