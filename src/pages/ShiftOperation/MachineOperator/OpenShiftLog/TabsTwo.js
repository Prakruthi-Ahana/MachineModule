import React, { useState } from 'react';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form1 from './ProgramMaterialTab/Form1';
import ProgramPartsForm from './ProgramPartsTab/ProgramPartsForm';
import MarkAsUsedForm from './ProgramMaterialTab/MarkAsUsedForm';
export default function TabsTwo() {

    const [key, setKey] = useState("pm");
  return (
    <div>
      <div className='row'>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3  " style={{fontSize:'12px'}}
    >

      <Tab eventKey="pm" title="Program Material">
       <Form1/>
       {/* <MarkAsUsedForm/> */}
       </Tab>

       <Tab eventKey="pp" title="Program Parts">
      <ProgramPartsForm/>
       </Tab>
      
    </Tabs>
  </div>
    </div>
  );
}
