import axios from "axios";
import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../api/baseUrl";
import { useState } from "react";
import { useEffect } from "react";
import OpenShiftModal from "./OpenShiftLogModal";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../Context/Context";


export default function MachineOperator() {
  const {
    setAfterRefreshData,
    NcId,
    setFormData,
    setAfterloadService,
    setShiftSelected,setServiceTopData,setNcProgramId,setShowTable,programPartsData, setProgramPartsData
  } = useGlobalContext();

  //get Machine List
  const [machineList, setMachineList] = useState([]);
  const getMachineList = () => {
    axios.get(baseURL + "/ShiftOperator/getallMachines")
    .then((response) => {
      setMachineList(response.data);
      // console.log(response.data);
    });
  };


  useEffect(() => {
    getMachineList();
  }, []);

  //Selected Machine
  const moment = require("moment");
  const today = moment();
  let Date = today.format("YYYY-MM-DD HH:mm:ss");
  //  console.log(Date);

  let array = Date.split(" ");
  //  console.log(array[1]);
  let date = array[0];

  // Date Format  Change
  let date1 = date.split("-");
  let year1 = date1[0];
  let month1 = date1[1];
  let day1 = date1[2];
  let finalDay1 = day1 + "/" + month1 + "/" + year1;
  let Time = array[1].split(":");
  let hour = parseInt(Time[0]); // Ensure hour is parsed as an integer
  let Shift = "";
  if (hour >= 6 && hour < 14) {
    Shift = "First";
  } else if (hour >= 14 && hour < 22) {
    Shift = "Second";
  } else {
    Shift = "Third";
  }


  const [selectedMachine, setSelectedMachine] = useState("");
  const [shiftDetails, setShiftDetails] = useState([]);
  const handleMachineChange = (e) => {
    setSelectedMachine(e.target.value);
    axios
      .post(baseURL + "/ShiftOperator/getShiftDetails", {
        refName: e.target.value,
        ShiftDate: date,
        Shift: Shift,
      })
      .then((response) => {
        setShiftDetails(response.data);
      });
      setFormData([]);
  };


  //Open ShiftLog  Modal
  const [openmodal, setOpenmodal] = useState("");
  const [requiredProgram, setRequiredProgram] = useState("");

  const navigate = useNavigate();

  //selecting table
  const [selectshifttable, setSelectshifttable] = useState({});
  const selectShifttableRow = (item, index) => {
    let list = { ...item, index: index };
    setSelectshifttable(list);
  };

  useMemo(() => {
    setSelectshifttable({ ...shiftDetails[0], index: 0 });
  }, [shiftDetails[0]]);

  // console.log(selectshifttable);

  const data = {
    selectedMachine: selectedMachine || "",
    finalDay1: finalDay1 || "",
    selectshifttable: selectshifttable || "",
    Shift: Shift || "",
    date: date || "",
  };

  //profile
  const getmiddleTbaleData = () => {
    axios
      .post(baseURL + "/ShiftOperator/ProgramMaterialAfterRefresh", {
        selectshifttable,
        NcId,
      })
      .then((response) => {
        setAfterRefreshData(response?.data?.complexData1);
        setShowTable(true);
        if (!response.data.complexData1) {
          setAfterRefreshData([]);
          setShowTable(false)
        }
        setFormData(response?.data?.complexData2[0]);
        if (!response?.data?.complexData2[0]) {
          setFormData([]);
        }
        setNcProgramId(response?.data.complexData2[0].Ncid)
        setShowTable(true);
      });
  };

  useEffect(()=>{
    getmiddleTbaleData();
  },[])

  //service middletabledata
  const serviceMiddleTableData = () => {
    // console.log("function called")
    axios
      .post(baseURL + "/ShiftOperator/ServiceAfterpageOpen", {
        selectshifttable,
        NcId,
      })
      .then((response) => {
        // console.log(response?.data);
        setAfterloadService(response?.data);
        // setShowTable(true);
        if (!response.data) {
          setAfterloadService([]);
          // setShowTable(false)
        }
      });
  };

  // const getProgramParts = () => {
  //   axios
  //     .post(baseURL + "/ShiftOperator/getprogramParts", {
  //       NcId: NcId,
  //     })
  //     .then((response) => {
  //       setProgramPartsData(response.data);
  //     });
  // };

  //openShiftLog Button
  const openShiftLogModal = () => {
    setShiftSelected(selectshifttable);
    serviceMiddleTableData();
    getmiddleTbaleData();
    // getProgramParts();
    axios
      .post(baseURL + "/ShiftOperator/getTableTopDeatailsAfterPageRefresh", {
        selectshifttable,
      })
      .then((response) => {
        setServiceTopData( response.data);
      });
    axios
      .post(baseURL + "/ShiftOperator/getRowCounts", {
        selectshifttable,
      })
      .then((response) => {
        if (response.data === true) {
          axios
            .post(baseURL + "/ShiftOperator/getProgram", {
              MachineName: selectedMachine,
            })
            .then((response) => {
              // console.log("required program", response.data);
              setRequiredProgram(response.data);
            });
          //ProcessTaskStatus
          axios
            .post(baseURL + "/ShiftOperator/ProcessTaskStatus", {
              ShiftDate: date,
            })
            .then((response) => {
              // console.log(response.data);
            });
          setOpenmodal(true);
        } else {
          navigate("OpenShiftLog", { state: { data } });
          // //update operator
          // axios
          // .post(baseURL + "/ShiftOperator/updateOpertaorafterChange", {
          //   selectshifttable
          // })
          // .then((response) => {
          //   // console.log(response.data);
          // });
        }
      });
  };

  const onClickofClose=()=>{
    navigate("/Machine");
  }

  useEffect(() => {
    getmiddleTbaleData();
    serviceMiddleTableData();
  }, []);

  
  //update Machine Time
  const updateMachineTime=()=>{
    axios.post(baseURL + "/ShiftOperator/updateMachineTime",
    {Machine:selectshifttable?.Machine})
    .then((response) => {
    });
  }

  
  useEffect(() => {
    updateMachineTime();
  }, [selectshifttable]);

  return (
    <div>
      <OpenShiftModal
        openmodal={openmodal}
        setOpenmodal={setOpenmodal}
        selectedMachine={selectedMachine}
        finalDay1={finalDay1}
        selectshifttable={selectshifttable}
        Shift={Shift}
        date={date}
        requiredProgram={requiredProgram}
      />

      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Shift Selection Form</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-12 mt-2">
          <h6 className="mt-2" style={{ whiteSpace: "nowrap" }}>
            <b>Operator Current Shift Selector Form</b>
          </h6>
        </div>

        <div className="row mt-2">
          <div className="col-md-4" style={{ display: "flex" }}>
            <label style={{ whiteSpace: "nowrap" }} className="form-label">
              Select Machine
            </label>
            <select className="ip-select ms-5" onChange={handleMachineChange}>
              <option selected>Select Machine</option>
              {machineList.map((dataMachineList) => (
                <option value={dataMachineList.refName}>
                  {dataMachineList.refName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <button
              className="button-style   group-button"
              onClick={openShiftLogModal}
            >
              Open Shift Log
            </button>
            <button
                className="button-style group-button ms-2"
                style={{ width: "130px"}}
                onClick={onClickofClose}
              >
                Close
              </button>
          </div>
        </div>
        <div></div>

        <div className="row mt-3 mb-5">
          <div
            className="col-md-3  col-sm-12"
            style={{ display: "flex", gap: "40px" }}
          >
            <b>Shift Date</b>
            <b>{finalDay1}</b>
          </div>
          <div
            className="col-md-3 col-sm-12"
            style={{ display: "flex", gap: "40px", marginLeft: "-50px" }}
          >
            <b>Shift</b>
            <b>{Shift}</b>
          </div>
        </div>
        <div></div>

        <div
          style={{ display: "flex", gap: "30px", marginTop: "-30px" }}
          className="ms-2"
        >
          <div>{finalDay1}</div>
          <div className="col-md-3" style={{ display: "flex", gap: "10px" }}>
            <span>{finalDay1}</span>
            <div>
              {Shift === "First" ? (
                <p>6:00:00</p>
              ) : Shift === "Second" ? (
                <p>14:00:00</p>
              ) : Shift === "Third" ? (
                <p>22:00:00</p>
              ) : null}
            </div>
          </div>
          <span style={{ marginLeft: "-170px" }}>-</span>
          <div
            className="col-md-3"
            style={{ display: "flex", gap: "10px", marginLeft: "-12px" }}
          >
            <span>{finalDay1}</span>
            <div>
              {Shift === "First" ? (
                <p>14:00:00</p>
              ) : Shift === "Second" ? (
                <p>22:00:00</p>
              ) : Shift === "Third" ? (
                <p>6:00:00</p>
              ) : null}
            </div>
          </div>
        </div>

        <hr
          style={{
            backgroundColor: "black",
            height: "3px",
          }}
        />

        <div
          style={{
            height: "400px",
            width: "600px",
            overflowY: "scroll",
            overflowX: "scroll",
            marginTop: "20px",
          }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor">
              <tr>
                <th>Operator</th>
                <th>Shift Remarks</th>
              </tr>
            </thead>
            <tbody className="tablebody">
              {shiftDetails.map((item, key) => {
                return (
                  <>
                    <tr
                      onClick={() => {
                        selectShifttableRow(item, key);
                      }}
                      className={
                        key === selectshifttable?.index ? "selcted-row-clr" : ""
                      }
                    >
                      <td>{item.Operator}</td>
                      <td>{item.ShiftRemarks}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
