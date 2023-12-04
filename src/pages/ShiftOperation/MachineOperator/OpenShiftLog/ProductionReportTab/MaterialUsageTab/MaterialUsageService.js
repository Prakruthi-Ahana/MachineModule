import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../../api/baseUrl";
import axios from "axios";

export default function MaterialUsageService({
  openTable,
  selectProductionReport,rpTopData
}) {
  const [servicedata, setService] = useState([]);


  const materialUsageService = () => {
    axios
      .post(baseURL + "/ShiftOperator/MachineTasksService", {
        NCId: selectProductionReport.Ncid,
      })
      .then((response) => {
        console.log(response);
        setService(response.data);
      });
  };

  useEffect(() => {
    materialUsageService();
  }, [selectProductionReport]);

  const [selectedRowService, setSelectedRowService] = useState({});
  const rowSelectServiceRP = (item, index) => {
    let list = { ...item, index: index };
    setSelectedRowService(list);
  };

  useMemo(() => {
    // console.log("afterRefreshData[0]:", afterRefreshData[0]);
    setSelectedRowService({ ...servicedata[0], index: 0 });
  }, [servicedata[0]]);

  if (!openTable) {
    return null; // Render null if showTable is false
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <div className="mt-2">
        <div className="col-md-12 col-sm-12">
          <div className="ip-box form-bg ">
            <div className="row col-md-12 mb-2">
              <div
                className="col-md-2 "
                style={{ marginTop: "-10px", marginLeft: "-5px" }}
              >
                <label
                  className="form-label"
                  style={{ fontSize: "10px", marginLeft: "-15px" }}
                >
                  IV No :{rpTopData[0]?.IV_No}
                </label>
              </div>
              <div className="col-md-3" style={{ marginTop: "-10px" }}>
                <label
                  className="form-label"
                  style={{ fontSize: "10px", marginLeft: "-20px" }}
                >
                  Issue Date :{formatDate(rpTopData[0]?.Issue_date)}
                </label>
              </div>

              <div
                className="col-md-3"
                style={{ marginTop: "-10px", marginLeft: "0px" }}
              >
                <label className="form-label" style={{ fontSize: "10px" }}>
                  Sets Issued :{rpTopData[0]?.QtyIssued}
                </label>
              </div>

              <div className="col-md-2" style={{ marginTop: "-10px" }}>
                <label
                  className="form-label"
                  style={{ fontSize: "10px", marginLeft: "-15px" }}
                >
                 Used :{rpTopData[0]?.QtyUsed}
                </label>
              </div>

              <div className="col-md-2" style={{ marginTop: "-10px" }}>
                <label
                  className="form-label"
                  style={{ fontSize: "10px", marginLeft: "-15px" }}
                >
                 Returned :{rpTopData[0]?.QtyReturned}
                </label>
              </div>

              <div
                className="col-md-6 d-flex  "
                style={{ marginTop: "-10px", marginLeft: "-20px" }}
              >
                <div className="col-md-6 mt-3">
                  <label className="form-label" style={{ fontSize: "12px" }}>
                    Sets Issued :
                  </label>
                </div>
                <div className="col-md-10  mt-2">
                  <input
                    className="in-field w-75"
                    style={{ marginTop: "10px" }}
                  />
                </div>

                <div className="row">
                  <div
                    style={{ textAlign: "center", marginTop: "-14px" }}
                    className="col-md-6"
                  >
                    <div className="mt-2">
                      <button
                        className="button-style mt-2 group-button mt-4 mx-3 "
                        style={{ width: "100px", fontSize: "14px" }}
                      >
                        Mark as Used
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-2 col-md-12"
        style={{ overflowY: "scroll", overflowX: "scroll", height: "250px" }}
      >
        <Table striped className="table-data border">
          <thead
            className="tableHeaderBGColor table-space"
            style={{ fontSize: "13px" }}
          >
            <tr>
              <th>Part Id</th>
              <th>RV No</th>
              <th>Issued</th>
              <th>Used</th>
              <th>UsedNow</th>
            </tr>
          </thead>

          <tbody className="tablebody table-space" style={{ fontSize: "12px" }}>
            {servicedata.map((item, key) => {
              return (
                <>
                  <tr
                    onClick={() => {
                      rowSelectServiceRP(item, key);
                    }}
                    className={
                      key === selectedRowService?.index ? "selcted-row-clr" : ""
                    }
                  >
                    <td>{item.PartId}</td>
                    <td>{item.RV_No}</td>
                    <td>{item.QtyIssued}</td>
                    <td>{item.QtyUsed}</td>
                    <td>{item.QtyReturned}</td>
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
