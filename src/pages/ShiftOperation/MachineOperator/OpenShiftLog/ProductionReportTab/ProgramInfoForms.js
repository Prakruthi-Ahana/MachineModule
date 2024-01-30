import React, { useEffect, useState } from "react";
import MaterialAndPartsTabs from "./MaterialAndPartsTabs";
import { Table } from "react-bootstrap";
import LoadProgramInfoModal from "./LoadProgramInfoModal";
import ProgramCompleteModal from "./ProgramCompleteModal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../../../../Context/Context";
import { baseURL } from "../../../../../api/baseUrl";
import axios from "axios";

export default function ProgramInfoForms({
  getMachinetaskdata,
  selectshifttable,
  getMachineTaskData,
}) {
  const { setHasBOM, NcId, shiftSelected } = useGlobalContext();
  const [loadProgramInfo, setloadProgramInfo] = useState(false);
  const [programComplete, setProgramComplete] = useState(false);

  const [selectProductionReport, setSelectProductionReport] = useState({});
  const selectProductionReportFun = (item, index) => {
    let list = { ...item, index: index };
    setSelectProductionReport(list);
    axios
      .post(baseURL + "/ShiftOperator/checkhasBOM", {
        NCId: list?.Ncid,
      })
      .then((response) => {
        console.log(response.data);
        setHasBOM(response.data);
      });
      setOpenTable(false);
  };

  //Load Program
  const[rpTopData,setRptTopData]=useState([]);
  const [openTable, setOpenTable] = useState(false);
  let newNcid = "";
  const handleButtonClick = () => {
    axios
    .post(baseURL + "/ShiftOperator/getTableTopDeatails", {
      NCId: selectProductionReport?.Ncid,
    })
    .then((response) => {
      console.log(response.data);
      setRptTopData(response.data);
    })
        axios
      .post(baseURL + "/ShiftOperator/getNCId", {
        shiftSelected,
      })
      .then((response) => {
        if (response.data && response.data.length > 0) {
          newNcid = response.data[0].Ncid;
  
          // Move the following code inside the if condition
          console.log(selectProductionReport.Ncid, newNcid);
          if (selectProductionReport.Ncid === newNcid) {
            toast.error(
              "Program Currently Being Processed, Use Current Program Window To Update Values",
              {
                position: toast.POSITION.TOP_CENTER,
              }
            );
          } else {
            setOpenTable(true);
          }
        } else {
          // If response.data is empty, execute setOpenTable(true)
          setOpenTable(true);
        }
      })
      .catch((error) => {
        // Handle error if the request fails
        // console.error("Error fetching data:", error);
      });
  };
  

  const handleSubmit = () => {
    setloadProgramInfo(true);
  };

  //mark as Completed
  const programCompleteSubmit = async () => {
    try {
      const response = await axios.post(baseURL + "/ShiftOperator/getNCId", {
        shiftSelected,
      });
  
      if (response.data && response.data.length > 0) {
        newNcid = response.data[0].Ncid;
  
        // console.log(selectProductionReport.Ncid, newNcid);
        if (selectProductionReport.Ncid === newNcid) {
          toast.error(
            "Program Currently Being Processed, Use Current Program Window To Update Values",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else {
          setProgramComplete(true);
        }
      } else {
        // If response.data is empty, execute setProgramComplete(true)
        setProgramComplete(true);
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
    if (getMachinetaskdata.length > 0 && !selectProductionReport.NCProgramNo) {
      selectProductionReportFun(getMachinetaskdata[0], 0); // Select the first row
    }
  }, [getMachinetaskdata, selectProductionReport, selectProductionReportFun]);

  const handleRefresh = () => {
    setOpenTable(false);
    if (getMachinetaskdata.length > 0) {
      selectProductionReportFun(getMachinetaskdata[0], 0);
    }
  };

  return (
    <div>
      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border table-space">
          <thead className="tableHeaderBGColor" style={{ fontSize: "13px" }}>
            <tr>
              <th style={{ whiteSpace: "nowrap" }}>Program No</th>
              <th style={{ whiteSpace: "nowrap" }}>Task No</th>
              <th style={{ whiteSpace: "nowrap" }}>Customer</th>
            </tr>
          </thead>

          <tbody className="tablebody table-space" style={{ fontSize: "13px" }}>
            {getMachinetaskdata.map((item, key) => {
              return (
                <>
                  <tr
                    onClick={() => {
                      selectProductionReportFun(item, key);
                    }}
                    className={
                      key === selectProductionReport?.index
                        ? "selcted-row-clr"
                        : ""
                    }
                  >
                    <td>{item.NCProgramNo}</td>
                    <td>{item.TaskNo}</td>
                    <td>{item.cust_name}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="row">
        <div className=" col-md-5">
          <div
            style={{
              backgroundColor: "#d3d3d3",
              marginTop: "2px",
              marginLeft: "-12px",
              fontSize: "12px",
              height: "270px",
            }}
          >
            <p style={{ textAlign: "center" }}>
              <b>Process Info </b>
            </p>

            <div style={{ marginLeft: "10px" }}>
              <p>
                {" "}
                Program No : <b>{selectProductionReport?.NCProgramNo}</b>
              </p>
            </div>

            <div style={{ marginLeft: "10px" }}>
              <p>
                Process : <b>{selectProductionReport?.MProcess} </b>
              </p>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>
                Operation : <b> {selectProductionReport?.Operation} </b>
              </p>
            </div>

            <div style={{ marginLeft: "10px" }}>
              <p>
                {" "}
                To Process : <b> {selectProductionReport?.Qty} </b>
              </p>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>
                Allotted :<b> {selectProductionReport?.QtyAllotted}</b>
              </p>
            </div>

            <div style={{ marginLeft: "10px" }}>
              <p>
                Processed : <b> {selectProductionReport?.QtyCut}</b>
              </p>
            </div>
          </div>
        </div>

        <div className=" col-md-7">
          <div
            style={{
              backgroundColor: "#d3d3d3",
              marginTop: "2px",
              marginLeft: "-12px",
              fontSize: "12px",
              height: "270px",
            }}
          >
            <p style={{ textAlign: "center" }}>
              <b>Production Info </b>
            </p>

            <div style={{ marginLeft: "10px" }}>
              <p>
                {" "}
                Customer :<b> {selectProductionReport?.cust_name} </b>
              </p>
            </div>

            <div style={{ marginLeft: "10px" }}>
              <p>
                Material :<b> {selectProductionReport?.Mtrl_Code}</b>
              </p>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>
                Drawings :<b> {selectProductionReport?.NoOfDwgs} </b>
              </p>
            </div>

            <div style={{ marginLeft: "10px" }}>
              <p>
                Total Parts :<b>{selectProductionReport?.TotalParts}</b>
              </p>
            </div>
            <div style={{ marginLeft: "10px" }}>
              <p>
                Planned Time :<b>{selectProductionReport?.EstimatedTime} </b>
              </p>
            </div>

            <div style={{ color: "", marginLeft: "10px" }}>
              <p>
                Actual Time :<b>{selectProductionReport?.ActualTime} </b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div style={{ textAlign: "", marginLeft: "0px" }} className="col-md-6">
          <div>
            <button
              className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "150px", fontSize: "14px" }}
              onClick={handleButtonClick}
            >
              Load Program Info
            </button>
          </div>
        </div>

        <div style={{ textAlign: "", marginLeft: "0px" }} className="col-md-4">
          <div>
            <button
              className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "150px", fontSize: "14px", marginLeft: "-70px" }}
              onClick={programCompleteSubmit}
            >
              Program complete
            </button>
          </div>
        </div>

        <div style={{ textAlign: "", marginLeft: "0px" }} className="col-md-2">
          <div>
            <button
              className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "130px", fontSize: "14px", marginLeft: "-60px" }}
              onClick={handleRefresh}
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <MaterialAndPartsTabs
        selectProductionReport={selectProductionReport}
        openTable={openTable}
        selectshifttable={selectshifttable}
        rpTopData={rpTopData}
        setRptTopData={setRptTopData}
      />

      <LoadProgramInfoModal
        loadProgramInfo={loadProgramInfo}
        setloadProgramInfo={setloadProgramInfo}
      />

      <ProgramCompleteModal
        programComplete={programComplete}
        setProgramComplete={setProgramComplete}
        selectProductionReport={selectProductionReport}
        getMachineTaskData={getMachineTaskData}
      />
    </div>
  );
}
