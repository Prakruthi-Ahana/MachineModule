import React, { useEffect, useState } from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MachineTaskTable from './MachineTasksTab/MachineTaskTable';
import FormAndTable from './ShiftLogTab/FormAndTable';
import ShiftSummryTable from './ShiftSummaryTab/ShiftSummryTable';
import ProgramInfoForms from './ProductionReportTab/ProgramInfoForms';
import axios from 'axios';
import { baseURL } from '../../../../api/baseUrl';

export default function TabsFour({selectshifttable}) {
    const [key, setKey] = useState("mt");



    const[shiftLogDetails,setShiftLogDetails]=useState([])
    const getShiftLogDetails=()=>{
      axios
      .post(baseURL + "/ShiftOperator/getShiftLog", {
        selectshifttable:selectshifttable
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit1 = response.data[i].FromTime.split(" ");
          let date1 = dateSplit1[0].split("-");
          let year1 = date1[0];
          let month1 = date1[1];
          let day1 = date1[2];
          let time = dateSplit1[1].split(":");
          let Time = time[0] + ":" + time[1];
          let finalDay1 = day1 + "/" + month1 + "/" + year1 + " " + Time;
          response.data[i].FromTime = finalDay1;
        }
        for (let i = 0; i < response.data.length; i++) {
          let dateSplit2 = response.data[i].ToTime.split(" ");
          let date2 = dateSplit2[0].split("-");
          let year2 = date2[0];
          let month2 = date2[1];
          let day2 = date2[2];
          let time1 = dateSplit2[1].split(":");
          let Time1 = time1[0] + ":" + time1[1];
          let finalDay2 = day2 + "/" + month2 + "/" + year2 + " " + Time1;
          response.data[i].ToTime = finalDay2;
        }

        for (let i = 0; i < response.data.length; i++) {
          let dateSplit3 = response.data[i].SrlTime.split(".");
          console.log(dateSplit3);
          let date3 = dateSplit3[0];
          response.data[i].SrlTime = date3;
        }

        console.log(response.data);
        setShiftLogDetails(response.data)
      });
    }

    useEffect(()=>{
      getShiftLogDetails();
    },[selectshifttable])
    
  return (
    <div>
      <div className='row'>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-2  "
      style={{fontSize:'12px'}}
    >
      

      <Tab eventKey="mt" title="Machine Tasks" >
       <MachineTaskTable/>
       </Tab>

       <Tab eventKey="sl" title="Shift Log">
      <FormAndTable shiftLogDetails={shiftLogDetails}
      setShiftLogDetails={setShiftLogDetails}/>
       </Tab>

       <Tab eventKey="pr" title="Production Report">
       <ProgramInfoForms/>
       </Tab>

       <Tab eventKey="ss" title="Shift Summary">
      <ShiftSummryTable/>
       </Tab>
      
    </Tabs>
  </div>
    </div>
  );
}
