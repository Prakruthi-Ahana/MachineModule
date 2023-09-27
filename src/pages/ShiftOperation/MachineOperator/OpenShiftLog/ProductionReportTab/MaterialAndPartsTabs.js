import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import MaterialUsageForm from './MaterialUsageTab/MaterialUsageForm';
import LaserCutForm from './MaterialUsageTab/LaserCutForm';
import ShowDfxForm from './PartsDetailsTab/ShowDfxForm';

export default function MaterialAndPartsTabs({selectProductionReport , openTable}) {
  
    const [key, setKey] = useState("mu");
    console.log("dde", selectProductionReport )
  return (
    <div>
       <div className='row'>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-1 mt-2  " style={{fontSize:'12px'}}
    >
      

      <Tab eventKey="mu" title="Material Usage">
      {/* <MaterialUsageForm/> */}
      <LaserCutForm
      selectProductionReport={selectProductionReport}
      openTable ={openTable}
      />
       </Tab>

       <Tab eventKey="pd" title="Parts Details">
      <ShowDfxForm/>
       </Tab>
      
    </Tabs>
  </div>
    </div>
  );
}
