import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { baseURL } from "../../../../api/baseUrl";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import ValidationAlertModal from "./ValidationAlertModal";

export default function ErrorReportForm({
  setErrorForm,
  errorForm,
  selectedMachine,
  selectshifttable,
}) {
  const handleClose = () => {
    setErrorForm(false);
  };

  const [formValues, setFormValues] = useState({
    machine: selectedMachine,
    operator: selectshifttable.Operator,
    errorNo: "",
    errorDescription: "",
    actionTaken: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const[openalert,setOpenAlert]=useState('');
  const handleSubmit = () => {
    const { errorNo, errorDescription, actionTaken } = formValues;
    // Validate required fields
    if (!errorNo || !errorDescription || !actionTaken) {
      alert("ErrorNo,Error Description are mandatory")
    // setOpenAlert(true);
      return;
    }

    axios
      .post(baseURL + "/ShiftOperator/errorForm", { formValues })
      .then((response) => {
        // console.log(response.data);
      });
    handleClose();
  };

  const onClickReset = () => {
    setFormValues({
      ...formValues,
      errorNo: "",
      errorDescription: "",
      actionTaken: "",
    });
  };

  // console.log(formValues);

  return (
    <div>
      <ValidationAlertModal
      openalert={openalert}
      setOpenAlert={setOpenAlert}/>

      <Modal show={errorForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>magod_machine</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="col-md-12">
              <div className="row">
                <h5>Operator Error Report Form</h5>
              </div>
            </div>
            <div className="ip-box form-bg">
              <div className="row"></div>

              <div className="d-flex ms-3 col-md-12 mt-2">
                <label className="form-label col-md-4">Machine</label>
                <input
                  className="in-field col-md-6"
                  value={formValues.machine}
                  disabled
                />
              </div>

              <div className="col-md-12 mt-2 d-flex ms-3">
                <label className="form-label col-md-4">Operator</label>
                <input
                  className="in-field col-md-6"
                  value={formValues.operator}
                  disabled
                />
              </div>

              <div className="col-md-12 mt-2 d-flex ms-3">
                <label className="form-label col-md-4">Error No</label>
                <input
                  className="in-field col-md-6"
                  name="errorNo"
                  value={formValues.errorNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-6 mt-3 d-flex ms-3 ">
                <label className="form-label col-md-8">Error Description</label>
                <textarea
                  className="col-md-4"
                  maxLength={100}
                  style={{
                    height: "80px",
                    width: "223px",
                    resize: "none",
                  }}
                  name="errorDescription"
                  value={formValues.errorDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div className="col-md-6 mt-3 d-flex ms-3">
                <label className="form-label col-md-8">Action Taken</label>
                <textarea
                  className="col-md-4"
                  maxLength={100}
                  style={{
                    height: "80px",
                    width: "223px",
                    resize: "none",
                  }}
                  name="actionTaken"
                  value={formValues.actionTaken}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row mt-3 mb-2">
                <div className="col-md-5"></div>

                <div className="col-md-2 col-sm-12">
                  <button
                    className="button-style  group-button"
                    style={{ width: "60px" }}
                    onClick={onClickReset}
                  >
                    Reset
                  </button>
                </div>

                <div className="col-md-1 col-sm-12">
                  <button
                    className="button-style  group-button"
                    style={{ width: "70px" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
