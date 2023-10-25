import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import MarkasRejectedModal from './MarkasRejectedModal';
import RowRejectedModal from './RowRejectedModal';
import ShowUnusedModal from './ShowUnusedModal';
import AllModal from './AllModal';
import axios from 'axios';
import { baseURL } from '../../../../../../api/baseUrl';
// import AltModal from '../../../AltModal';


export default function LaserCutForm({selectProductionReport ,openTable}) {


 
//  const[showModal,setShowModal]=useState(false);
 const [markasRejected, setMarkasRejected]=useState(false);
 const [rowsRejected, setRowsRejected]=useState(false);
 const[showUnused, setShowUnused]=useState(false);
 const [allModal, setAllModal]=useState(false);

 const [openModal , setOpenModal] = useState(false)
//  const [modalData, setModalData] = useState({ title: '', content: '' });
 
 const handleclickmarkused = () => {
   setOpenModal(true);
 };
 
 const markasused = () => {
   setOpenModal(false);
 };
 
 const handleClose = () => {
   setOpenModal(false);
 };
 
 const rejectSubmit=()=>{
  setMarkasRejected(true);
 }


 const showUnusedSubmit=()=>{
setShowUnused(true);
 }

 console.log("Laser Data", selectProductionReport?.Ncid)

 const selectProductionReportData =   selectProductionReport?.Ncid
 const [ProductionReportData , setProductionReportData] = useState([])

 const MaterialUsage = () => {
   axios.post(baseURL + "/ShiftOperator/MachineTasksProfile", {NCId:selectProductionReportData
   }).then((response) => {
     console.log(response)
     setProductionReportData(response.data)
  })
 
 }
 useEffect(() => {
  MaterialUsage(); 
 }, [selectProductionReport]);

 console.log("Testing data", ProductionReportData);

  return (
    <div>
      <div className='mt-2'>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg " >
            <div className="row" style={{gap:'10px',marginLeft:'-5px'}}>
               
              <div style={{textAlign:"center",marginLeft:'-12px'}} className='col-md-3'>
            <div>
            <button className="button-style mt-2 group-button mt-4 mb-2"
              style={{ width: "110px",fontSize:"13px"}} 
      //          onClick={() => {
      //   setModalData({
      //     title: "Mark as Used",
      //     content: (
      //       <div>
      //         Material Once Marked as Used Cannot be Used again. Are You Sure?
      //       </div>
      //     ),
      //   });
      //   handleclickmarkused();
      // }}
              >
              Mark as Used
            </button>
            </div>
           
            
            </div>

            <div style={{textAlign:"center"}} className='col-md-4'>
            <div>
            <button className="button-style mt-2 group-button mt-4 mb-2"
              style={{ width: "110px",fontSize:"13px"}} 
              onClick={rejectSubmit}  >
              Mark as Rejected
            </button>
            </div>
           
            
            </div>

            <div className="col-md-3 row mt-3">
                <input type='checkbox' className='col-md-2' onClick={ showUnusedSubmit}/>
                <label className="form-label col-md-1 mt-1" style={{whiteSpace:'nowrap',marginLeft:'-6px'}}><b>show unused</b> </label>
              </div>

            </div>
          </div>

        </div>
    </div>



    <div className='col-md-12' style={{ overflowY: 'scroll', overflowX: 'scroll', height: '250px',  }}>
    {openTable ? (
      <Table striped className="table-data border">
        <thead className="tableHeaderBGColor" style={{ fontSize: '12px' }}>
          <tr>
            <th style={{ whiteSpace: 'nowrap' }}>Material Id</th>
            <th>Length</th>
            <th>width</th>
            <th>Used</th>
            <th>Rejected</th>
            <th style={{ whiteSpace: 'nowrap' }}>Rejection Reason</th>
          </tr>
        </thead>
        <tbody className='tablebody'>
          {ProductionReportData.map((data, index) => (
            <tr className={index === selectProductionReport?.index ? 'selected-row-clr' : ''} key={index}>
              <td>{data.ShapeMtrlID}</td>
              <td>{data.Para1}</td>
              <td>{data.Para2}</td>
              <td>{data.Used}</td>
              <td>{data.Rejected}</td>
              <td>{data.RejectionReason}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <div style={{whiteSpace:'nowrap',marginLeft:"170px"}}>
         <td>No Data Available </td>
      </div>
    )}
         

        </div >

    
        
  

       {
        // markasRejected &&
        <MarkasRejectedModal
        markasRejected={markasRejected} setMarkasRejected={setMarkasRejected}/>
       }


       {
rowsRejected &&
<RowRejectedModal rowsRejected={rowsRejected} setRowsRejected={setRowsRejected} />
       }

       {
         showUnused &&
         <ShowUnusedModal 
         showUnused={showUnused} setShowUnused={setShowUnused}/>
       }

       {
        allModal &&
        <AllModal allModal={allModal} 
        setAllModal={setAllModal}/>
       }
      
    </div>
  );
}
