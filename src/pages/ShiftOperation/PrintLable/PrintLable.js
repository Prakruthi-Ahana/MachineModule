import React, { useState } from 'react'
import HeadForm from './components/HeadForm'
import SideTable from './components/SideTable'
import axios from 'axios'
import { baseURL } from '../../../api/baseUrl'
import { useMemo } from 'react'

export default function PrintLable() {

  const[ncprogramNo,setNcprogramNo]=useState('')
  const[printLabelData,setPrintLaelData]=useState([])
  const LoadProgram = () => {
    axios
      .post(baseURL + "/printLabel/getTabledata", { NcProgramNo:ncprogramNo })
      .then((response) => {
        // console.log(response.data);
        setPrintLaelData(response.data);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  //row select
  const [selectRow, setSelectRow] = useState({});
 const selectRowPrintLabel = (item, index) => {
   let list = { ...item, index: index };
   setSelectRow(list);
 };

 useMemo(() => {
   setSelectRow({ ...printLabelData[0], index: 0 });
 }, [printLabelData[0]]);

  return (
    <div>
     <HeadForm setNcprogramNo={setNcprogramNo}
     LoadProgram={LoadProgram}
     selectRow={selectRow}
     printLabelData={printLabelData}
     />
     <SideTable
     printLabelData={printLabelData}
     selectRow={selectRow}
     selectRowPrintLabel={selectRowPrintLabel}
     />
    </div>
  )
}
