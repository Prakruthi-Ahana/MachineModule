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
  console.log(NcId);

  const[afterloadProgram,setAfterloadProgram]=useState([])
  const afterLoadProgram=()=>{
    axios
    .post(baseURL + "/ShiftOperator/MachineTasksProfile", {
      NCId: NcId,
    })
    .then((response) => {
      console.log(response.data);
      setAfterloadProgram(response.data);
    });
  }


  return (
    <>
    <div>
      <OpenShiftLogForm selectedMachine={selectedMachine} 
      finalDay1={finalDay1}
      selectshifttable={selectshifttable}
      />
      </div>

      <div className='row col-md-12'>
      <div className='col-md-3'>
      <MachineShiftStatusForm selectshifttable={selectshifttable}
      Shift={Shift}
      finalDay1={finalDay1}
      date={date}/>
      </div>
      <div className='col-md-4'>
      <TabsTwo
      afterloadProgram={afterloadProgram}
      />
      </div>

      <div className='col-md-5'>
      <TabsFour
      selectshifttable={selectshifttable}
      afterLoadProgram={afterLoadProgram}
      />
      </div>
      
      </div>
    
    </>
  );
}
