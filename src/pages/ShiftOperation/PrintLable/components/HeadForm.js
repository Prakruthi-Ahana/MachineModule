import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../../../../api/baseUrl";
import PrintSelectedModal from "../PrintPDF/PrintSelected/PrintSelectedModal";
import GlobalModal from "../../MachineOperator/GlobalModal";
import PrintAllModal from "../PrintPDF/PrintAll/PrintAllModal";

export default function HeadForm({ setNcprogramNo, LoadProgram, selectRow ,printLabelData }) {
  const handleChangeNcProgram = (e) => {
    setNcprogramNo(e.target.value);
  };
  

  const [openPrintSelect, setOpenPrintSelected] = useState(false);
  const openPrintSelectedPdf = () => {
    setOpenPrintSelected(true);
  };

  
  //Print All Modal 
  const [currentIndex, setCurrentIndex] = useState(0);
  const[currentDwg,setCurrentDwg]=useState('')
  const[askPrintAll,setAskPrintAll]=useState('');
  const  askPrintAllModal=()=>{
    setAskPrintAll(true);
  }

  const hadleclose=()=>{
    setAskPrintAll(false);
  }
  

  //onClick yes print modal
  const[onClickyes,setOnclickofYes]=useState(false);
  const onClickofyes = () => {
    // Close the current GlobalModal
    setAskPrintAll(false);

    // Render the modal with the content based on the current object
    const currentObject = printLabelData[currentIndex];

    // Pass the current object to both modals
    setOnclickofYes(currentObject);

    // Open the GlobalModal for the current object
    askPrintAllModal();
  };

  // Render the modal with the content based on the current object
const currentObject = printLabelData[currentIndex];


// ...

// Additional state to track whether it has looped back to index 0
const [loopedBack, setLoopedBack] = useState(false);

const handleClosepdf = () => {
  setOnclickofYes(false);

  // Check if there are more objects to process
  if (currentIndex + 1 < printLabelData.length) {
    // Increment the index to move to the next object
    setCurrentIndex(currentIndex + 1);

    // Open the GlobalModal for the next object
    askPrintAllModal();
  } else {
    // If all objects are processed and not looped back yet
    if (!loopedBack) {
      // Set the loopedBack flag to true
      setLoopedBack(true);
      setAskPrintAll(false);
    }
    // If looped back, stop further processing
  }
};


  return (
    <div>
      <div className="col-md-12">
        <div className="">
          <h4 className="title">Program Parts List</h4>
        </div>
      </div>

      <div className="bg-light row mt-2 col-md-12">
        <div className="col-md-2 mb-1">
          <label className="form-label">Enter NC Program No</label>
          <input type="text" onChange={handleChangeNcProgram} />
        </div>

        <div className="col-md-3">
          <button
            className="button-style mt-4 group-button ms-2"
            style={{ width: "150px" }}
            onClick={LoadProgram}
          >
            Load Program
          </button>
        </div>

        <div className="col-md-3" style={{ marginLeft: "-116px" }}>
          <button
            className="button-style mt-4 group-button"
            style={{ width: "150px" }}
            onClick={askPrintAllModal}
          >
            Print All
          </button>
        </div>

        <div className="col-md-3" style={{ marginLeft: "-116px" }}>
          <button
            className="button-style mt-4 group-button"
            style={{ width: "150px" }}
            onClick={openPrintSelectedPdf}
          >
            Print Selected
          </button>
        </div>
      </div>

      <PrintSelectedModal
        openPrintSelect={openPrintSelect}
        setOpenPrintSelected={setOpenPrintSelected}
        selectRow={selectRow}
      />

<GlobalModal
        show={askPrintAll}
        title="magod_machine"
        content={
          <div>
            Do You wish to Print '{currentObject?.DwgName}'?
          </div>
        }
        onYesClick={() => onClickofyes()}
        onNoClick={() => hadleclose()}
        onClose={() => hadleclose()}
      />

      <PrintAllModal
        onClickyes={onClickyes}
        setOnclickofYes={setOnclickofYes}
        currentObject={currentObject?.DwgName}
        onClose={() => handleClosepdf()}
      />
    </div>
  );
}
