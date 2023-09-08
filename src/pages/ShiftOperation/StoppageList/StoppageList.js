import React, { useEffect, useState } from "react";
import GroupNameTable from "./GroupNameTable";
import axios from "axios";
import StoppageForm from "./StoppageForm";

export default function StoppageList() {

const[getGroupNameList,setGetGroupNameList]=useState([])
const getGroupName=()=>{
  axios.get(
   "http://172.16.20.61:5006/reports/getGroupName",
   {
  }).then((response) => {
    console.log(response.data)
    setGetGroupNameList(response.data);
 });
}
useEffect(()=>{
  getGroupName();
},[]);


const[selectedGroup,setSelectedGroup]=useState({})
const selectedRowFn=(item,index)=>{
  let list={...item,index:index}
  // api call
  setSelectedGroup(list)
}

useEffect(() => {
  if (getGroupNameList.length > 0 && !selectedGroup.GroupName) {
    selectedRowFn(getGroupNameList[0], 0); // Select the first row
  }
}, [getGroupNameList, selectedGroup, selectedRowFn]);

  return (
    <div className="row">
      <h4 className="title mb-4">StoppageList</h4>
      <div className="col-md-6 col-sm-12">
        <GroupNameTable getGroupNameList={getGroupNameList} 
                selectedGroup={selectedGroup}
                selectedRowFn={selectedRowFn}
        />
      </div>

      <div className="col-md-6 col-sm-12">    
        <StoppageForm
            selectedGroup={selectedGroup}
            getGroupName={getGroupName}
        />
     </div>
    </div>
  );
}
