import React, { useEffect, useState } from "react";
import ErrorReportForm from "./ErrorReportForm";
import { baseURL } from "../../../../api/baseUrl";
import axios from "axios";
import StoppageAskModal from "./StoppageAskModal";

export default function OpenShiftLogForm({
  selectedMachine,
  finalDay1,
  selectshifttable,
}) {
  const [errorForm, setErrorForm] = useState(false);
  const [isInputVisible, setInputVisible] = useState(false);
  const [alreadyLoad, setAlreadyLoad] = useState(false);
  const [stoppageID, setStoppageID] = useState("");
  const [stoppageList, setStoppageList] = useState([]);
  const [stoppageReasonList, setStoppageReasonList] = useState([]);
  const [stoppageReason, setStoppageReason] = useState("");

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleOpen = () => {
    setErrorForm(true);
  };

  const refreshSubmit = () => {
    setInputVisible(false);
  };

  let array = finalDay1.split("/");
  let finalDay = array[0] + "/" + array[1];

  const [selectedStoppageID, setSelectedStoppageID] = useState("");
  const [selectedStoppage, setSelectedStoppage] = useState("");
  const selectBothOption = (e) => {
    console.log("select option", e.target.value);
    setStoppageReason(e.target.value);
    if (e.target.value !== " ") {
      setAlreadyLoad(true);
    } else {
      console.log("rtyuiop");
    }
    const selectedStoppageID = e.target.value;
    const selectedStoppage = e.target.selectedOptions[0].dataset.stoppage;
    setSelectedStoppageID(selectedStoppageID);
    setSelectedStoppage(selectedStoppage);
  };

  console.log("Selected StoppageID:", selectedStoppageID);
  console.log("Selected Stoppage:", selectedStoppage);

  const handleChangeStoppageList = (e) => {
    setStoppageID(e.target.value);
  };

  const getStoppageReasonList = () => {
    axios
      .post(baseURL + "/ShiftOperator/stoppageReasonList", {
        stoppageID: stoppageID,
      })
      .then((response) => {
        setStoppageReasonList(response.data);
        console.log(response.data);
      });
  };

  const getStoppageList = () => {
    axios.get(baseURL + "/ShiftOperator/stoppageList").then((response) => {
      setStoppageList(response.data);
      // console.log(response.data)
    });
  };

  useEffect(() => {
    getStoppageList();
  }, []);

  useEffect(() => {
    getStoppageReasonList();
  }, [stoppageID]);

  return (
    <div>
      <StoppageAskModal
        alreadyLoad={alreadyLoad}
        setAlreadyLoad={setAlreadyLoad}
        stoppageReason={stoppageReason}
        selectshifttable={selectshifttable}
        selectedStoppageID={selectedStoppageID}
        selectedStoppage={selectedStoppage}
      />
      <div className="row">
        <div className="col-md-12">
          <h4 className="title">Machine Log Book</h4>
        </div>
      </div>

      <div className="col-md-12">
        <div className="row">
          <div className="col-md-5">
            <h5 className="mt-2">Magod Laser Machining Pvt Ltd</h5>
            <h6 className="mt-2">
              Machine Operator information and Working Form
            </h6>
          </div>
          <div className="col-md-7 mt-2">
            <div className="row">
              {isInputVisible && (
                <div className="col-md-3">
                  <div>
                    <select
                      className="ip-select dropdown-field mt-2"
                      onChange={handleChangeStoppageList}
                    >
                      <option>Choose an option</option>
                      {stoppageList.map((value, key) => (
                        <option value={value.StoppageGpId} key={key}>
                          {value.GroupName}
                        </option>
                      ))}
                    </select>

                    <select className="ip-select" onChange={selectBothOption}>
                      <option>Choose an option</option>
                      {stoppageReasonList.map((value, key) => (
                        <option
                          value={value.StoppageID}
                          data-stoppage={value.Stoppage}
                          key={key}
                        >
                          {value.Stoppage}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              <button
                className="button-style group-button"
                style={{ width: "110px", marginTop: "10px", fontSize: "14px" }}
                onClick={toggleInput}
              >
                Stoppage
              </button>

              <button
                className="button-style group-button"
                style={{ width: "110px", marginTop: "10px", fontSize: "14px" }}
              >
                Get Program
              </button>
              <button
                className="button-style group-button"
                style={{ width: "110px", marginTop: "10px", fontSize: "14px" }}
                onClick={handleOpen}
              >
                Error Report
              </button>
              <button
                className="button-style group-button"
                style={{ width: "110px", marginTop: "10px", fontSize: "14px" }}
                onClick={refreshSubmit}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-2">
          <div className="row">
            <div className="col-md-1 col-sm-12">
              <label className="form-label">{selectedMachine}</label>
            </div>

            <div className="col-md-1 col-sm-12">
              <label className="form-label">{finalDay}</label>
            </div>

            <div className="col-md-1 col-sm-12">
              <label className="form-label">Status</label>
            </div>

            <div className="col-md-1 col-sm-12">
              <label className="form-label">OFF</label>
            </div>
          </div>
        </div>
      </div>
      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
        }}
      />
      <ErrorReportForm
        errorForm={errorForm}
        setErrorForm={setErrorForm}
        selectedMachine={selectedMachine}
        selectshifttable={selectshifttable}
      />
    </div>
  );
}
