import React, { useState } from "react";
import { Table } from "react-bootstrap";

export default function FormAndTable({ shiftLogDetails,setShiftLogDetails}) {

  const handleTimeChange = (index, field, value) => {
    const updatedshiftLogDetails = shiftLogDetails.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [field]: value,
        };
      }
      return item;
    });

    setShiftLogDetails(updatedshiftLogDetails);
  };

  console.log(shiftLogDetails)

  return (
    <div>
      <div style={{ marginTop: "10px" }} className="col-md-6 col-sm-12">
        <h5 className="mt-2 ms-2"> Shift Log Book </h5>
      </div>
      <div className="row mb-2">
        <div className="col-md-3 col-sm-12">
          <button
            className="button-style  group-button"
            style={{ width: "80px", marginTop: "10px", fontSize: "14px" }}
          >
            Save
          </button>
        </div>

        <div className="col-md-3 col-sm-12">
          <button
            className="button-style  group-button"
            style={{ width: "80px", marginTop: "10px", fontSize: "14px" }}
          >
            Close Shift
          </button>
        </div>
        <div className="col-md-3 col-sm-12">
          <button
            className="button-style  group-button"
            style={{ width: "80px", marginTop: "10px", fontSize: "14px" }}
          >
            Prepare
          </button>
        </div>
        <div className="col-md-3 col-sm-12">
          <button
            className="button-style  group-button"
            style={{ width: "80px", marginTop: "10px", fontSize: "14px" }}
          >
            UpDate
          </button>
        </div>
      </div>

      <div
        className="col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border">
          <thead className="tableHeaderBGColor" style={{ fontSize: "12PX" }}>
            <tr>
              <th style={{ whiteSpace: "nowrap" }} >Srl</th>
              <th style={{ whiteSpace: "nowrap" }}>Program </th>
              <th style={{ whiteSpace: "nowrap",textAlign:"center" }}>From Time</th>
              <th style={{ whiteSpace: "nowrap",textAlign:"center"}}>To Time</th>
              <th style={{ whiteSpace: "nowrap" }}>Remarks</th>
              <th style={{ whiteSpace: "nowrap" }}>Srl Time</th>
              <th style={{ whiteSpace: "nowrap" }}>Locked</th>
            </tr>
          </thead>

          <tbody className="tablebody">
            {shiftLogDetails.map((item, key) => {
              return (
                <>
                  <tr >
                    <td style={{ whiteSpace: "nowrap" }}>{key+1}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{item.StoppageReason}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <div>
                      <input
                          className="table-cell-editor"
                          style={{ textAlign: "center", width: "150px" }}
                          value={item?.FromTime}
                          onChange={(e) =>
                            handleTimeChange(key, "FromTime", e.target.value)
                          }
                        />
                      </div>
                      </td>x
                    <td style={{ whiteSpace: "nowrap" }}>
                    <input
                          className="table-cell-editor"
                          style={{ textAlign: "center", width: "150px" }}
                          value={item?.ToTime}
                          onChange={(e) =>
                            handleTimeChange(key, "ToTime", e.target.value)
                          }
                        />
                      </td>
                    <td style={{ whiteSpace: "nowrap" }}>{item.Remarks}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{item.SrlTime}</td>
                    <td style={{ whiteSpace: "nowrap",textAlign:"center"}}>{item.Locked}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
