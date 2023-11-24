import React from 'react';
import OpenShiftLogForm from './OpenShiftLogForm';
import MachineShiftStatusForm from './MachineShiftStatusForm';
import Form1 from './ProgramMaterialTab/Form1';
import TabsTwo from './TabsTwo';
import TabsFour from './TabsFour';
import {useLocation} from 'react-router-dom';
import { useGlobalContext } from '../../../../Context/Context';
import { baseURL } from '../../../../api/baseUrl';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function CallFile() {
  const location = useLocation();
  const {data}=location?.state || '';
  
  let selectedMachine=data?.selectedMachine;
  let finalDay1=data?.finalDay1;
  let selectshifttable=data?.selectshifttable;
  let Shift=data?.Shift;
  let date=data?.date;



  const{NcId,setAfterRefreshData}=useGlobalContext();

  const[afterloadProgram,setAfterloadProgram]=useState([])

  const [showTable, setShowTable] = useState(true);
  const [getMachinetaskdata, setMachinetaskdata] = useState([]);

 
  const afterLoadProgram=()=>{
    axios
    .post(baseURL + "/ShiftOperator/MachineTasksProfile", {
      NCId: NcId,
    })
    .then((response) => {
      console.log(response.data);
      setAfterloadProgram(response.data);
      setAfterRefreshData(response.data);
      setShowTable(true)
    });
  }

  // useEffect(() => {
  //   afterLoadProgram();
  // }, []);

  const[shiftSummaryData,setShiftSummaryData]=useState([])
  const getShiftSummaryData = () => {
    axios
      .post(baseURL + "/ShiftOperator/ShiftSummary",{selectshifttable})
      .then((response) => {
        console.log(response.data);
        setShiftSummaryData(response.data);
      })
  };

const[machineShiftStatus,setMachineShiftStatus]=useState([])
  const getMachineShiftStatusForm=()=>{
    console.log(selectshifttable)
    axios
    .post(baseURL + "/ShiftOperator/getmachineShiftStatus", {
    selectshifttable
    })
    .then((response) => {
     console.log(response.data);
     setMachineShiftStatus(response.data);
      });
  }

  useEffect(()=>{
    getMachineShiftStatusForm()
  },[])

    //Machine Task Table
    let Machine=selectshifttable?.Machine;
  const getMachineTaskData = () => {
    axios
      .post(baseURL + "/ShiftOperator/MachineTasksData", { MachineName:Machine })
      .then((response) => {
        // console.log(response.data);
        setMachinetaskdata(response.data);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  return (
    <>
    <div>
      <OpenShiftLogForm selectedMachine={selectedMachine} 
      finalDay1={finalDay1}
      selectshifttable={selectshifttable}
      showTable={showTable}
      setShowTable={setShowTable}
      getShiftSummaryData={getShiftSummaryData}
      getMachinetaskdata={getMachinetaskdata}
      setMachinetaskdata={setMachinetaskdata}
      getMachineShiftStatusForm={getMachineShiftStatusForm}
      getMachineTaskData={getMachineTaskData}
      />
      </div>

      <div className='row col-md-12'>
      <div className='col-md-3'>
      <MachineShiftStatusForm 
      selectshifttable={selectshifttable}
      Shift={Shift}
      finalDay1={finalDay1}
      date={date}
      showTable={showTable}
      machineShiftStatus={machineShiftStatus}
      getMachineShiftStatusForm={getMachineShiftStatusForm}
      />
      </div>
      <div className='col-md-4'>
      <TabsTwo
      setAfterloadProgram={setAfterloadProgram}
      afterloadProgram={afterloadProgram}
      showTable={showTable}
      selectedMachine={selectedMachine}
      getMachineShiftStatusForm={getMachineShiftStatusForm}
      selectshifttable={selectshifttable}
      />
      </div>

      <div className='col-md-5'>
      <TabsFour
      selectshifttable={selectshifttable}
      afterLoadProgram={afterLoadProgram}
      getShiftSummaryData={getShiftSummaryData}
      shiftSummaryData={shiftSummaryData}
      setShiftSummaryData={setShiftSummaryData}
      getMachinetaskdata={getMachinetaskdata}
      setMachinetaskdata={setMachinetaskdata}
      getMachineShiftStatusForm={getMachineShiftStatusForm}
      setShowTable={setShowTable}
      getMachineTaskData={getMachineTaskData}
      />

     
      </div>
      
      </div>
    
    </>
  );
}
