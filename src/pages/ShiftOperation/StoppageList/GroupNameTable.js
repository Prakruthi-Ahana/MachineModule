import React from 'react';
import Table from "react-bootstrap/Table";


export default function GroupNameTable({getGroupNameList,selectedGroup,selectedRowFn}) {

  
  return (
    <div className='row mt-1'>
    <div>
     <div style={{height:"430px",overflowY: "auto"}}>
     <Table striped className="table-data border">
       <thead className="tableHeaderBGColor">
         <tr>
           <th>SL NO</th>
           <th>GropName</th>
           {/* <th>Working</th> */}
         </tr>
       </thead>


     <tbody>
        {getGroupNameList.map((item,key)=>{
return(
    <>
    <tr onClick={()=>selectedRowFn(item,key)} 
          className={key===selectedGroup?.index? 'selcted-row-clr':'' }
    >
             <td>{key+1}</td>
             <td>{item.GroupName}</td>
             {/* {
              <td>
                 <input className="form-check-input mt-2"
                   type="checkbox"
                   disabled
                   value=""
                   id="flexCheckDefault"/>
              </td>
             } */}
         </tr>
    </>
)
        })}
    
       </tbody>
 </Table>
     </div>

 </div>
</div>
  )
}
