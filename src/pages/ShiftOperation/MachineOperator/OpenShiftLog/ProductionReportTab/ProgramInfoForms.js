import React, { useState } from 'react';
import MaterialAndPartsTabs from './MaterialAndPartsTabs';
import { Table } from 'react-bootstrap';
import LoadProgramInfoModal from './LoadProgramInfoModal';
import ProgramCompleteModal from './ProgramCompleteModal';

export default function ProgramInfoForms() {
  const [loadProgramInfo,setloadProgramInfo]=useState(false); 
  const [programComplete, setProgramComplete]=useState(false);

  const handleSubmit=()=>{
setloadProgramInfo(true);
  }

  const programCompleteSubmit=()=>{
setProgramComplete(true);
  }
  return (
    <div>

       <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px', 
     }}>
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor" style={{fontSize:'13px'}}>
              <tr>
                
               
                <th></th>
                <th style={{whiteSpace:'nowrap'}}>Program No</th>
                <th style={{whiteSpace:'nowrap'}}>Task No</th>
                
               

                

              </tr>
            </thead>

                  <tbody className='tablebody' style={{fontSize:'13px'}}>
                    <tr >
                    
                      
                      {/* <td></td>
                      <td></td>
                      <td></td>
                       */}
                     
                     
                    </tr>
                  </tbody>
          </Table>

        </div >

      <div className='row'>


     




    
      <div className=' col-md-6'>
       
       <div style={{textAlign:"",backgroundColor:"#d3d3d3",
        marginTop:"2px",marginLeft:"-12px",fontSize:"14px",}}
       >
          <p style={{marginLeft:'50px'}}><b>Process Info </b></p>

          <div style={{color:"",marginLeft:'10px'}}> <b>Program No :  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Process :</b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b>Operation:  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>To Process:</b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b>Allotted :  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Processed :</b></div>

           
            
           
         
        </div>
    </div>




    <div className=' col-md-6'>
       
       <div style={{textAlign:"",backgroundColor:"#d3d3d3",
        marginTop:"2px",marginLeft:"-12px",fontSize:"14px",}}
       >
          <p style={{marginLeft:'50px'}}><b>Production Info </b></p>

          <div style={{color:"",marginLeft:'10px'}}> <b>Customer:  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Material :</b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b>Drawings:  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Total Parts:</b></div>
           <div style={{color:"",marginLeft:'10px'}}> <b>Planned Time:  </b></div>
          
           <div style={{color:"",marginLeft:'10px'}}><b>Actual Time :</b></div>

           
            
           
         
        </div>
    </div>


    </div>

<div className='row'>
     <div style={{textAlign:"",marginLeft:'0px'}} className='col-md-6'>
            <div>
            <button className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "130px",fontSize:"14px",marginLeft:'5px'}} 
             onClick={handleSubmit}   >
             Load Program Info
            </button>
            </div>
           
            
            </div>

            <div style={{textAlign:"",marginLeft:'0px'}} className='col-md-4'>
            <div>
            <button className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "130px",fontSize:"14px",marginLeft:'-10px'}} 
               onClick={programCompleteSubmit} >
             Program complete
            </button>
            </div>
           
            
            </div>


            <div style={{textAlign:"",marginLeft:'0px'}} className='col-md-2'>
            <div>
            <button className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "70px",fontSize:"14px",marginLeft:'-12px'}} 
                >
             Refresh
            </button>
            </div>
           
            
            </div>

            </div>


<MaterialAndPartsTabs/>
{
  loadProgramInfo &&
  <LoadProgramInfoModal 
  loadProgramInfo={loadProgramInfo} setloadProgramInfo={setloadProgramInfo} />
}


{
  programComplete &&
  <ProgramCompleteModal
   programComplete={programComplete} setProgramComplete={setProgramComplete}/>
}
            
    </div>
  );
}
