import React, { useEffect, useState } from "react";
import { baseURL } from "../../../../api/baseUrl";
import axios from "axios";
import { useGlobalContext } from "../../../../Context/Context";

export default function MachineShiftStatusForm({
  selectshifttable,
  Shift,
  finalDay1,
  date,
  showTable,
}) {
  const { selectedProgram, afterloadData } = useGlobalContext();

  var count = 0;
  const [isInputVisible, setInputVisible] = useState(false);

  const toggleInput = () => {
    count = count + 1;

    if (count === 1) {
      setInputVisible(true);
    } else {
      setInputVisible(false);
      ///ChangeOperator
      axios
        .post(baseURL + "/ShiftOperator/UpdateOperator", {
          Operator: ChangedOperator,
          Shift: Shift,
          ShiftDate: date,
        })
        .then((response) => {
          console.log(response.data);
        });
    }
  };

  const [operatorsList, setOperatorsList] = useState([]);
  useEffect(() => {
    axios.get(baseURL + "/ShiftOperator/getShiftIncharge").then((response) => {
      // console.log(response.data);
      setOperatorsList(response.data);
    });
  }, []);
  const [ChangedOperator, setChangedOperator] = useState("");
  const handleShiftIncharge = (e) => {
    setChangedOperator(e.target.value);
  };

  return (
    <>
      <div className="">
        <div
          style={{
            textAlign: "",
            backgroundColor: "#d3d3d3",
            marginTop: "2px",
            marginLeft: "-12px",
            fontSize: "14px",
          }}
        >
          <p style={{ textAlign: "center" }}>
            {" "}
            <b>Machine Shift Status </b>
          </p>

          <div className="d-flex ms-4">
            <div style={{ width: "auto", textAlign: "left" }}>
              <div style={{ marginLeft: "5px" }}>
                {" "}
                <b>Operator : {selectshifttable.Operator} </b>
              </div>
              <div style={{ marginLeft: "5px" }}>
                <b>Current : {selectshifttable.Operator} </b>
              </div>
            </div>
          </div>

          <br></br>

          <div className="d-flex">
            <button
              className="button-style mt-2 group-button mt-2 mb-2"
              style={{ width: "80px", fontSize: "14px", marginLeft: "20px" }}
              onClick={toggleInput}
            >
              Select{" "}
              {isInputVisible ? (
                <div
                  className="col-md-12"
                  style={{
                    marginLeft: "120px",
                    marginTop: "-25px",
                    width: "140px",
                  }}
                >
                  <select
                    className="ip-select"
                    onChange={handleShiftIncharge}
                    value={selectshifttable.Operator}
                  >
                    <option selected>Select Shift Incharge</option>
                    {operatorsList.map((operatorsList) => (
                      <option value={operatorsList}>{operatorsList}</option>
                    ))}
                  </select>
                </div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </div>

      <div className=" mt-2 ">
        <div
          style={{
            textAlign: "",
            backgroundColor: "#d3d3d3",
            marginLeft: "-12px",
            fontSize: "14px",
          }}
        >
          <p style={{ textAlign: "center" }}>
            <b>Process Task Status </b>
          </p>
          <div className="d-flex">
            <div style={{ width: "auto", textAlign: "left" }}>
              <div style={{ marginLeft: "15px" }}>
                {" "}
                <b>Task No : {showTable ? afterloadData?.TaskNo : ""} </b>
              </div>

              <div style={{ marginLeft: "15px" }}>
                <b>Operation : {showTable ? afterloadData?.Operation : ""} </b>
              </div>
              <div style={{ color: "", marginLeft: "15px" }}>
                {" "}
                <b>Material : {showTable ? afterloadData?.Mtrl_Code : ""} </b>
              </div>

              <div style={{ marginLeft: "15px" }}>
                <b>
                  Program no : {showTable ? afterloadData?.NCProgramNo : ""}
                </b>
              </div>
              <div style={{ marginLeft: "15px" }}>
                {" "}
                <b>Start Time : </b>
              </div>

              <div className="mb-3" style={{ color: "", marginLeft: "15px" }}>
                <b>Running For :</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <div
          className=""
          style={{
            backgroundColor: "#d3d3d3",
            marginLeft: "-12px",
            fontSize: "14px",
            marginBottom: "20px",
            height: "115px",
          }}
        >
          <div>
            <p style={{ textAlign: "center" }}>
              <b>Material Machine Time</b>
            </p>
            <div className="d-flex mx-2">
              <div style={{ width: "auto", textAlign: "left" }}>
                <div style={{ marginLeft: "10px" }}>
                  <b>Sheet Id : </b>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  {" "}
                  <b>Start Time : </b>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <b>Running For : </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
