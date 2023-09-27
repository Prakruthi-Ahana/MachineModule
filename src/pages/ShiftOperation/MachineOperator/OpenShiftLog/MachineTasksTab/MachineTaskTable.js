import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import LoadProgramModal from "./LoadProgramModal";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";
import MachineTaskProfile from "./MachineTaskProfile";

export default function MachineTaskTable({ selectshifttable,getMachinetaskdata}) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const[selectedProgram,setSelectedProgram]=useState({})
  const selectProgramFun=(item,index)=>{
      let list={...item,index:index}
      setSelectedProgram(list);
  }

  useEffect(() => {
    if (getMachinetaskdata.length > 0 && !selectedProgram.NCProgramNo) {
      selectProgramFun(getMachinetaskdata[0], 0); // Select the first row
    }
  }, [getMachinetaskdata, selectedProgram, selectProgramFun]);

  console.log("ewfwfwf", selectshifttable)

  return (
    <>
      <LoadProgramModal open={open} setOpen={setOpen} />

      <div>
        <div
          className="col-md-12"
          style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
        >
          <Table striped className="table-data border">
            <thead
              className="tableHeaderBGColor table-space"
              style={{ fontSize: "12px" }}
            >
              <tr>
                <th>Program No</th>
                <th>Task No</th>
                <th>Operation</th>
                <th>Material</th>
                <th>Quantity</th>
                <th>Allotted</th>
                <th>Process</th>
                <th>Customer</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody className="tablebody table-space">
              {getMachinetaskdata.map((data,key) => (
                <tr onClick={()=>{selectProgramFun(data,key)}} className={key===selectedProgram?.index? 'selcted-row-clr':'' }>
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
        </div>
      </div>

      <div className="d-flex ">
        <div className="mt-2 col-md-5 ">
          <div
            style={{
              textAlign: "",
              backgroundColor: "#d3d3d3",
              fontSize: "14px",
              height: "310px",
            }}
          >
            <p style={{ color: "", textAlign: "center" }}>
              <b>Program Info </b>
            </p>

            <div style={{ textAlign: "center" }}>
              <button
                className="button-style  group-button mt-2 mb-2"
                style={{
                  width: "100px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
                onClick={openModal}
              >
                Load Program
              </button>
            </div>
            <div className="d-flex mt-3">
              <div style={{ textAlign: "left" , fontSize:"12px"}}>
                <div className="" style={{ marginLeft: "10px"}}>
              
                  <p style={{ margin: 5}}>Program No :<b> {selectedProgram?.NCProgramNo} </b></p>
                </div>
                <div className="" style={{ marginLeft: "10px" }}>
                  <p style={{ margin: 5,paddingTop:"10px" }}>Process :<b>{selectedProgram?.MProcess}</b></p>
                </div>
                <div className="mt-1" style={{ color: "", marginLeft: "10px" }}>
                  <p style={{ margin: 5,paddingTop:"10px" }}>Operation :<b> {selectedProgram?.Operation} </b></p>
                </div>
                <div className="mt-1" style={{ color: "", marginLeft: "10px" }}>
                  {" "}
                  <p style={{ margin: 5,paddingTop:"10px" }}>To Process :<b> {selectedProgram?.Qty} </b></p>
                </div>
                <div className="mt-1" style={{ color: "", marginLeft: "10px" }}>
                  {" "}
                  <p style={{ margin: 5,paddingTop:"10px" }}>Processed : <b> {selectedProgram?.QtyCut} </b></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-2 col-md-7 ms-1">
          <div
            style={{
              textAlign: "",
              backgroundColor: "#d3d3d3",
              fontSize: "14px",
              height: "310px",
            }}
          >
            <p style={{ color: "", textAlign: "center" }}>
              <b>Material Info</b>
            </p>

          
              <div style={{ width: "auto", fontSize:"12px", marginLeft:"10px"}}>
                <div style={{ color: "" }}>
                  {" "}
                  <p style={{ margin: 5, paddingBottom:"5px" }}>Customer:<b style={{textAlign:"right"}}> {selectedProgram?.cust_name} </b> </p>
                </div>

                <div  style={{ color: ""}}>
                  <p style={{ margin: 5,  paddingBottom:"5px"}}>Code :<b  style={{textAlign:"right"}}> {selectedProgram?.Cust_Code}</b></p>
                </div>
                <div style={{ color: ""}}>
                  {" "}
                  <p style={{ margin: 5,  paddingBottom:"5px" }}>Source :<b  style={{textAlign:"right"}}> {selectedProgram?.CustMtrl}</b></p>
                </div>

                <div style={{ color: "" }}>
                  <p style={{ margin: 5, paddingBottom:"5px" }}>Length : <b style={{textAlign:"right"}}> {selectedProgram?.Para1}</b></p>
                </div>
                <div style={{ color: ""}}>
                  {" "}
                  <p style={{ margin: 5 ,  paddingBottom:"5px"}}>Width :<b  style={{textAlign:"right"}}> {selectedProgram?.Para2}</b></p>
                </div>

                <div style={{ color: ""}}>
                  <p style={{ margin: 5,  paddingBottom:"5px",  paddingBottom:"5px" }}>Remarks :<b  style={{textAlign:"right"}}> {selectedProgram?.Remarks}</b></p>
                </div>

                <div style={{ color: ""}}>
                  <p style={{ margin: 5 ,  paddingBottom:"5px"}}>Drawings :<b  style={{textAlign:"right"}}> {selectedProgram?.NoOfDwgs}</b></p>
                </div>
                <div style={{ color: ""}}>
                  {" "}
                  <p style={{ margin: 5,  paddingBottom:"5px" }}>Total Parts :<b  style={{textAlign:"right"}}> {selectedProgram?.TotalParts}</b></p>
                </div>

                <div style={{ color: ""}}>
                  <p style={{ margin: 5,  paddingBottom:"5px" }}>Machine Time:  <b  style={{textAlign:"right"}}></b></p>
                </div>
              </div>

            
          </div>
        </div>
      </div>

     

      
       <MachineTaskProfile 
       selectedProgram={selectedProgram}
      
       />
   
    </>
  );
}
