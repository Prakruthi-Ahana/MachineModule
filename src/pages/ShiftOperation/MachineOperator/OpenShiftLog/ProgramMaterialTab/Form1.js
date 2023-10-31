import React, { useMemo, useState } from "react";
import ProgramMtrlTableProfile from "./ProgramMtrlTableProfile";
import { useGlobalContext } from "../../../../../Context/Context";
import GlobalModal from "../../GlobalModal";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";

export default function Form1({ afterloadProgram, showTable, setAfterloadProgram,selectedMachine}) {
  const [mismatchModal, setmismatchModal] = useState(false);
  const [loadProgram, setLoadProgram] = useState(false);

  const handleSubmit = () => {
    setmismatchModal(true);
  };

  const handleClose=()=>{
    setLoadProgram(false);
    setmismatchModal(false)
        }

  const{selectedProgram,afterloadData,setAfterloadData }=useGlobalContext();
  console.log(afterloadData)

  //selecting table
  const[selectedMtrlTable,setSelectedMtrlTable]=useState({})
  const rowSelectMtrlTable=(item,index)=>{
      let list={...item,index:index}
      setSelectedMtrlTable(list);
  }

  useMemo(()=>{
   setSelectedMtrlTable({...afterloadProgram[0],index:0})
  },[afterloadProgram[0]])

  const loadProgramSubmit = () => {
    if(selectedMtrlTable.Used === 1 || selectedMtrlTable.Rejected === 1 )
    {
      toast.error('Cannot Load the Material that is Used or Rejected', {
        position: toast.POSITION.TOP_CENTER
      });
    }
    else{
      setLoadProgram(true);
    }
  };

  const onclickofYes=()=>{
    console.log("clicked yes in Load Material");
    axios
    .post(baseURL + "/ShiftOperator/loadMaterial", {
      selectedMtrlTable,
      MachineName:selectedMachine
    })
    .then((response) => {
      console.log(response.data);
    });
    setLoadProgram(false);
  }

  return (
    <>
      <div>
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg">
            <div className="col-md-8  ms-4" style={{ textAlign: "center" }}>
              <label className="form-label ms-5" style={{ fontSize: "12px" }}>
                NC Program sheet Details
              </label>
            </div>
            <div className="row ms-3">
              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Program no
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                
                  value={showTable ? afterloadData.NCProgramNo : ''}
                
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  To Process
                </label>
                <input
                  className="in-field "
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={ showTable ? afterloadData.Qty : ''}
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Allotted
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={ showTable ? afterloadData.QtyAllotted : ''}
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Processed
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={ showTable ? afterloadData.QtyCut : ''}
                />
              </div>

              <div className="col-md-6 ">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Drawings
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={ showTable ? afterloadData?.NoOfDwgs : ''}
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Total parts
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                  value={ showTable ? afterloadData?.TotalParts : ''}
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Program Time
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                />
              </div>

              <div className="col-md-6">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                  Machine Time
                </label>
                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label
                  className="form-label"
                  style={{ fontSize: "12px", marginLeft: "-15px" }}
                >
                
                  Remarks
                </label>

                <input
                  className="in-field"
                  style={{ marginTop: "-2px", marginLeft: "-15px" }}
                />
              </div>

              <div style={{ textAlign: "center" }} className="col-md-4">
                <div>
                  <button
                    className="button-style mt-3 group-button mt-4 mb-2"
                    style={{ width: "140px", fontSize: "13px" }}
                    onClick={loadProgramSubmit}
                  >
                    Load Program Material
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>

      <ProgramMtrlTableProfile
        afterloadProgram={afterloadProgram}
        setAfterloadProgram={setAfterloadProgram}
        showTable={showTable}
        selectedMtrlTable={selectedMtrlTable}
        rowSelectMtrlTable={rowSelectMtrlTable}
        setSelectedMtrlTable={setSelectedMtrlTable}
      
      />


      <GlobalModal
      show={loadProgram}
      title="magod_machine"
      content=<div>Do You wish to Load Material ID: <strong>{selectedMtrlTable.ShapeMtrlID}</strong> ?</div>
      onYesClick={() => onclickofYes()} 
      onNoClick={() => setLoadProgram(false)} 
      onClose={handleClose}
      />


      <GlobalModal
      show={mismatchModal}
      title="magod_machine"
      content=<div>Parts Quantity Mismatch</div>
      onYesClick={() => setmismatchModal(false)} 
      onNoClick={() => setmismatchModal(false)} 
      onClose={handleClose}
      />


    </>
  );
}
