import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import MaterialUsageForm from "./MaterialUsageTab/MaterialUsageForm";
import LaserCutForm from "./MaterialUsageTab/LaserCutForm";
import ShowDfxForm from "./PartsDetailsTab/ShowDfxForm";
import { useGlobalContext } from "../../../../../Context/Context";
import MaterialUsageService from "./MaterialUsageTab/MaterialUsageService";

export default function MaterialAndPartsTabs({
  selectProductionReport,
  openTable,
  selectshifttable,rpTopData,setRptTopData,setMachinetaskdata
}) {
  const { hasBOM } = useGlobalContext();
  const [key, setKey] = useState("mu");
  // console.log("dde", selectProductionReport )
  return (
    <div>
      <div className="row">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-1 mt-2  "
          style={{ fontSize: "12px" }}
        >
          <Tab eventKey="mu" title="Material Usage">
            {hasBOM === true ? (
              <MaterialUsageService
              openTable={openTable}
              selectProductionReport={selectProductionReport}
              rpTopData={rpTopData}
              selectshifttable={selectshifttable}
              setRptTopData={setRptTopData}
              setMachinetaskdata={setMachinetaskdata}
               />
            ) : (
              <LaserCutForm
                selectProductionReport={selectProductionReport}
                openTable={openTable}
                selectshifttable={selectshifttable}
                setMachinetaskdata={setMachinetaskdata}
              />
            )}
            {/* <MaterialUsageForm/> */}
          </Tab>

          <Tab eventKey="pd" title="Parts Details">
            <ShowDfxForm
            openTable={openTable}
            selectProductionReport={selectProductionReport}
             />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
