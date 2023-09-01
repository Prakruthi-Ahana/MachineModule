import React, { useState } from 'react';
import ProgrmMatrlTable from './ProgrmMatrlTable';
import MarkAsUsedForm from './MarkAsUsedForm';
import QuantityMismatchModal from './QuantityMismatchModal';
import LoadProgramMaterialModal from './LoadProgramMaterialModal';

export default function Form1() {
  const[mismatchModal, setmismatchModal]=useState(false);
  const [loadProgram, setLoadProgram]=useState(false);

  const handleSubmit=()=>{
setmismatchModal(true);
  }

  const loadProgramSubmit=()=>{
    setLoadProgram(true);
  }
  return (
    <>
    <div>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg " >
          <div className="col-md-8" >
                <label className="form-label ms-5" style={{fontSize:'12px',marginLeft:'0px'}}> NC Program sheet Details</label>
                
              </div>
            <div className="row" >
             
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}> To Process</label>
                <input  className='in-field '  style={{marginTop:'-2px',marginLeft:'-15px'}} />
              </div>
             
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}> Program no</label>
                <input  className='in-field' style={{marginTop:'-2px',marginLeft:'-15px'}}/>
                
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}> Allotted</label>
                <input  className='in-field'style={{marginTop:'-2px',marginLeft:'-15px'}} />
              </div>

              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}> Remarks</label>
     
                <input  className='in-field'style={{marginTop:'-2px',marginLeft:'-15px'}} />
                
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}> Processed</label>
                <input  className='in-field'  style={{marginTop:'-2px',marginLeft:'-15px'}}/>
              </div>

             
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}>Total parts </label>
                <input  className='in-field'style={{marginTop:'-2px',marginLeft:'-15px'}} />
              </div>
             
              <div className="col-md-6 ">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}>Drawings </label>
                <input  className='in-field'style={{marginTop:'-2px',marginLeft:'-15px'}} />
              </div>

              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}>Program Time</label>
                <input  className='in-field' style={{marginTop:'-2px',marginLeft:'-15px'}} />
              </div>
             
             
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'12px',marginLeft:'-15px'}}>Machine Time </label>
                <input  className='in-field' style={{marginTop:'-2px',marginLeft:'-15px'}} />
              </div>

             
              <div style={{textAlign:"center"}} className='col-md-4'>
            <div>
            <button className="button-style mt-2 group-button mt-4 mb-2"
              style={{ width: "140px",fontSize:"13px", marginLeft:'0px'}} 
               onClick={loadProgramSubmit} >
              Load Program Material
            </button>
            </div>
           
            
            </div>
            </div>
           
          </div>

         
        </div>
    </div>





    <div className='mt-2'>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg " style={{}}>
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
    <ProgrmMatrlTable/>
   
   (
    {
      mismatchModal &&
      <QuantityMismatchModal mismatchModal={mismatchModal} setmismatchModal={setmismatchModal} />
    }
   )

   {
    loadProgram &&
    <LoadProgramMaterialModal
    setLoadProgram={setLoadProgram} loadProgram={loadProgram}/>
   }
    </>
  );
}
