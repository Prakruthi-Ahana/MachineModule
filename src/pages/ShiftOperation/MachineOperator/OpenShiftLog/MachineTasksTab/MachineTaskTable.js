import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import LoadProgramModal from "./LoadProgramModal";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";
import MachineTaskProfile from "./MachineTaskProfile";
import { useGlobalContext } from "../../../../../Context/Context";
import GlobalModal from "../../GlobalModal";
import ErrorModal from './ErrorModal';


export default function MachineTaskTable({
  selectshifttable,
  getMachinetaskdata,
  afterLoadProgram,

}) {

  const { NcId, setNcId, selectedProgram, setSelectedProgram,afterloadData,setAfterloadData } =
    useGlobalContext();


  // Modal Related code....
  const [open, setOpen] = useState(false);
  const [isDataDisplayed, setIsDataDisplayed] = useState(false);
  const [ErrorshowModal, setErrorshowModal] = useState(false)



  const openModal = () => {
    if (isDataDisplayed) {
     
      setOpen(true); // Open the modal
    } else {
      setErrorshowModal(true); // Display the error message
    }
  };

  
  const handleSubmit = () => {
    afterLoadProgram();
    setAfterloadData(selectedProgram); 
    axios
    .post(baseURL + "/ShiftOperator/loadProgram", {
      selectedProgram
    })
    .then((response) => {
      console.log(response.data);
    });
    console.log("function called")
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  }


  const selectProgramFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectedProgram(list);
  };

  useEffect(() => {
    if (getMachinetaskdata.length > 0 && !selectedProgram.NCProgramNo) {
      selectProgramFun(getMachinetaskdata[0], 0); // Select the first row
    }
  }, [getMachinetaskdata, selectedProgram, selectProgramFun]);
  

  const [machineTaskData, setMachineTaskData] = useState([]);
  const machinetask = () => {
    axios
      .post(baseURL + "/ShiftOperator/MachineTasksProfile", {
        NCId: selectedProgram?.Ncid,
      })
      .then((response) => {
        console.log(response.data);
        setMachineTaskData(response.data);
        setIsDataDisplayed(true); // Data is displayed
      }).catch((err) => {
        console.log(err)
        setIsDataDisplayed(false); 
      })
  };

  let NCProgramNo = selectedProgram.NCProgramNo;

  useEffect(() => {
    setNcId(selectedProgram.Ncid);
  }, [selectedProgram.Ncid]);

  return (
    <>
     

       <GlobalModal 
       show={open}
       title="magod_machine"
       content={
        <>
          Do you wish to load NC Program No: <strong>{NCProgramNo}</strong> ?
        </>
      }
       onYesClick={handleSubmit}
       onNoClick={handleClose}
       onClose={handleClose}
       />
 

  
     

       

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
              {getMachinetaskdata.map((data, key) => (
                <tr
                  onClick={() => {
                    selectProgramFun(data, key);
                  }}
                  className={
                    key === selectedProgram?.index ? "selcted-row-clr" : ""
                  }
                  onDoubleClick={machinetask}
                >
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
              height: "280px",
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
              <div style={{ textAlign: "left", fontSize: "12px" }}>
                <div className="" style={{ marginLeft: "10px" }}>
                  <p style={{ margin: 5 }}>
                    Program No :<b> {selectedProgram?.NCProgramNo} </b>
                  </p>
                </div>

                <div className="" style={{ marginLeft: "10px" }}>
                  <p style={{ margin: 5 }}>
                    Process :<b>{selectedProgram?.MProcess}</b>
                  </p>
                </div>

                <div className="mt-1" style={{ color: "", marginLeft: "10px" }}>
                  <p style={{ margin: 5 }}>
                    Operation :<b> {selectedProgram?.Operation} </b>
                  </p>
                </div>

                <div className="mt-1" style={{ color: "", marginLeft: "10px" }}>
                  {" "}
                  <p style={{ margin: 5 }}>
                    To Process :<b> {selectedProgram?.Qty} </b>
                  </p>
                </div>

                <div className="mt-1" style={{ color: "", marginLeft: "10px" }}>
                  {" "}
                  <p style={{ margin: 5 }}>
                    Processed : <b> {selectedProgram?.QtyCut} </b>
                  </p>
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
              height: "280px",
            }}
          >
            <p style={{ color: "", textAlign: "center" }}>
              <b>Material Info</b>
            </p>

            <div
              style={{ width: "auto", fontSize: "12px", marginLeft: "10px" }}
            >
              <div style={{ color: "" }}>
                {" "}
                <p style={{ margin: 5 }}>
                  Customer:
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.cust_name}{" "}
                  </b>{" "}
                </p>
              </div>

              <div style={{ color: "" }}>
                <p style={{ margin: 5 }}>
                  Code :
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.Cust_Code}
                  </b>
                </p>
              </div>

              <div style={{ color: "" }}>
                {" "}
                <p style={{ margin: 5 }}>
                  Source :
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.CustMtrl}
                  </b>
                </p>
              </div>

              <div style={{ color: "" }}>
                <p style={{ margin: 5 }}>
                  Length :{" "}
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.Para1}
                  </b>
                </p>
              </div>

              <div style={{ color: "" }}>
                {" "}
                <p style={{ margin: 5 }}>
                  Width :
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.Para2}
                  </b>
                </p>
              </div>

              <div style={{ color: "" }}>
                <p style={{ margin: 5 }}>
                  Remarks :
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.Remarks}
                  </b>
                </p>
              </div>

              <div style={{ color: "" }}>
                <p style={{ margin: 5 }}>
                  Drawings :
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.NoOfDwgs}
                  </b>
                </p>
              </div>

              <div style={{ color: "" }}>
                {" "}
                <p style={{ margin: 5 }}>
                  Total Parts :
                  <b style={{ textAlign: "right" }}>
                    {" "}
                    {selectedProgram?.TotalParts}
                  </b>
                </p>
              </div>

              <div style={{ color: "" }}>
                <p style={{ margin: 5 }}>
                  Machine Time: <b style={{ textAlign: "right" }}></b>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MachineTaskProfile
        selectedProgram={selectedProgram}
        machineTaskData={machineTaskData}
        machinetask={machinetask}
        setIsDataDisplayed={setIsDataDisplayed}
      />

      {
        ErrorModal && (
          <ErrorModal
          ErrorshowModal={ErrorshowModal}
          setErrorshowModal={setErrorshowModal}
          />
          
        )
       }
    </>
  );
}
