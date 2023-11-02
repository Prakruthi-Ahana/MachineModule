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
  const {data}=location?.state || null;
  
  let selectedMachine=data?.selectedMachine;
  let finalDay1=data?.finalDay1;
  let selectshifttable=data?.selectshifttable;
  let Shift=data?.Shift;
  let date=data?.date;


  const{NcId,setNcId}=useGlobalContext();
  const[afterloadProgram,setAfterloadProgram]=useState([])
  const [showTable, setShowTable] = useState(true);

    const{selectedMtrlTable , setSelectedMtrlTable}=useGlobalContext(); 
  
  const [formattedDate, setFormattedDate] = useState(''); // State to store the formatted date and time for the current machine

  const afterLoadProgram = () => {
    axios
      .post(baseURL + "/ShiftOperator/MachineTasksProfile", {
        NCId: NcId,
      })
      .then((response) => {
        console.log(response.data);
        setAfterloadProgram(response.data);
        setShowTable(true);

        const currentDate = new Date();
        const options = {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        };
        const formattedDateValue = currentDate.toLocaleDateString('en-GB', options)
          .replace(/\//, '/')
          .replace(',', '');

        setFormattedDate(formattedDateValue); // Set the formatted date and time for the current machine
      });
  }
  console.log(afterloadProgram.NcId)

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


  return (
    <>
    <div>
      <OpenShiftLogForm selectedMachine={selectedMachine} 
      finalDay1={finalDay1}
      selectshifttable={selectshifttable}
      showTable={showTable}
      setShowTable={setShowTable}
      getShiftSummaryData={getShiftSummaryData}
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
      formattedDate={formattedDate}
      selectedMtrlTable={selectedMtrlTable}
      />
      </div>
      <div className='col-md-4'>
      <TabsTwo
      setAfterloadProgram={setAfterloadProgram}
      afterloadProgram={afterloadProgram}
      showTable={showTable}
      selectedMachine={selectedMachine}
      />
      </div>

      <div className='col-md-5'>
      <TabsFour
      selectshifttable={selectshifttable}
      afterLoadProgram={afterLoadProgram}
      getShiftSummaryData={getShiftSummaryData}
      shiftSummaryData={shiftSummaryData}
      setShiftSummaryData={setShiftSummaryData}
      />
     
      </div>
      
      </div>
    
    </>
  );
}
