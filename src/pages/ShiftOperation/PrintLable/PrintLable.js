import React, { useState } from 'react'
import HeadForm from './components/HeadForm'
import SideTable from './components/SideTable'
import axios from 'axios'
import { baseURL } from '../../../api/baseUrl'
import { useMemo } from 'react'
import DrawingCanvas from './DrawingCanvas'

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
  const [selectedRows, setSelectedRows] = useState([]);

const selectRowPrintLabel = (index) => {
  const selectedRowData = printLabelData[index];
  // Check if the row is already selected
  const isSelected = selectedRows.some((row) => row === selectedRowData);
  if (isSelected) {
    // If selected, remove it from the array
    setSelectedRows(selectedRows.filter((row) => row !== selectedRowData));
  } else {
    // If not selected, add it to the array along with row data
    setSelectedRows([...selectedRows, selectedRowData]);
  }
};

const reportData = [
  { name: 'Category A', value: 10 },
  { name: 'Category B', value: 20 },
];
//  useMemo(() => {
//    setSelectRow({ ...printLabelData[0], index: 0 });
//  }, [printLabelData[0]]);

  return (
    <div>
     <HeadForm setNcprogramNo={setNcprogramNo}
     LoadProgram={LoadProgram}
     selectedRows={selectedRows}
     printLabelData={printLabelData}
     />
     <SideTable
     printLabelData={printLabelData}
     selectedRows={selectedRows}
     selectRowPrintLabel={selectRowPrintLabel}
     />
    {/* <DrawingCanvas data={reportData} /> */}
    </div>
  )
}
