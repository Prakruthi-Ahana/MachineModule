import React, { useState } from "react";
import MarkAsUsedForm from "./MarkAsUsedForm";
import QuantityMismatchModal from "./QuantityMismatchModal";
import LoadProgramMaterialModal from "./LoadProgramMaterialModal";
import ProgramMtrlTableProfile from "./ProgramMtrlTableProfile";
import { useGlobalContext } from "../../../../../Context/Context";

export default function Form1({ afterloadProgram, showTable }) {
  const [mismatchModal, setmismatchModal] = useState(false);
  const [loadProgram, setLoadProgram] = useState(false);

  const handleSubmit = () => {
    setmismatchModal(true);
  };

  const loadProgramSubmit = () => {
    setLoadProgram(true);
  };

  const{selectedProgram,afterloadData,setAfterloadData }=useGlobalContext();

  console.log(afterloadData)

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
                  value={afterloadData.NCProgramNo}
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
                  value={afterloadData.Qty}
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
                  value={afterloadData.QtyAllotted}
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
                  value={afterloadData.QtyCut}
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
                  value={afterloadData?.NoOfDwgs}
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
                  value={afterloadData?.TotalParts}
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
        showTable={showTable}
      />

      <QuantityMismatchModal
        mismatchModal={mismatchModal}
        setmismatchModal={setmismatchModal}
      />

      <LoadProgramMaterialModal
        setLoadProgram={setLoadProgram}
        loadProgram={loadProgram}
      />
    </>
  );
}
