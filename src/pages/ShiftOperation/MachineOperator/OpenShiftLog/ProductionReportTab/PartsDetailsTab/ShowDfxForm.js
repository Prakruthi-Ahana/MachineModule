import axios from "axios";
import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import {baseURL} from "../../../../../../api/baseUrl"
import { useGlobalContext } from "../../../../../../Context/Context";
import { useEffect } from "react";

export default function ShowDfxForm() {

  const { NcId, setNcId} =useGlobalContext();

  const[partDetailsData,setPartDetailsData]=useState([]);
  const getPartDetails=()=>{
    axios
    .post(baseURL+ "/ShiftOperator/getpartDetails", {
      NcId:NcId
    })
    .then((response) => {
      console.log(response.data);
      setPartDetailsData(response.data);
    });
  }

  console.log(NcId)
  useEffect(()=>{
    getPartDetails();
  },[NcId])


  const [partDetailsRowSelect, setPartDetailsRowSelect] = useState({});
  const selectRowPartsDetails = (item, index) => {
    let list = { ...item, index: index };
    setPartDetailsRowSelect(list);
  };

  useMemo(()=>{
    setPartDetailsRowSelect({...partDetailsData[0],index:0})
   },[partDetailsData[0]])


  return (
    <div>
      <div className="form-bg ">
        <div
          className="row mb-3"
          style={{marginLeft: "-5px", marginTop: "-15px" }}
        >
          <div
            className="col-md-6"
            style={{ textAlign: "center", marginLeft: "-12px" }}
          >
            <button
              className="button-style group-button"
              style={{ fontSize: "13px", width: "80px", marginTop: "10px" }}
            >
              Save
            </button>
          </div>

          <div style={{ textAlign: "center" }} className="col-md-6">
            <button
              className="button-style group-button"
              style={{ fontSize: "13px", width: "80px", marginTop: "10px" }}
            >
              Show Dfx
            </button>
          </div>
        </div>
      </div>

      <div
        className="col-md-12 "
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border table-space">
          <thead className="tableHeaderBGColor" style={{ fontSize: "13px" }}>
            <tr>
              <th></th>
              <th >Dwg Name</th>
              <th >Total Nested</th>
              <th >Produced</th>
              <th >Rejected</th>
              <th >Remarks</th>
            </tr>
          </thead>

          <tbody className="tablebody table-space" style={{ fontSize: "13px" }}>
            {partDetailsData.length === 0 ? (
              <tr>
                <td colSpan="6">No data to show</td>
              </tr>
            ) : (
              partDetailsData.map((value, key) => (
                <tr
                key={key}
                  onClick={() => {
                    selectRowPartsDetails(value, key);
                  }}
                  className={
                    key === partDetailsRowSelect?.index
                      ? "selcted-row-clr"
                      : ""
                  }
                >                  <td></td>
                  <td>{value?.DwgName}</td>
                  <td>{value?.TotQtyNested}</td>
                  <td>{value?.QtyNested}</td>
                  <td>{value?.QtyRejected}</td>
                  <td>{value?.Remarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
