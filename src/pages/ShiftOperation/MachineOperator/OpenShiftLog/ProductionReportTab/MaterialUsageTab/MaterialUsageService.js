import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { baseURL } from "../../../../../../api/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../../../../../Context/Context";

export default function MaterialUsageService({
  openTable,
  selectProductionReport,
  rpTopData,
  setRptTopData,
  setMachinetaskdata,
  selectshifttable,
  setComplete,
}) {
  const { NcId, NcProgramId, setPartDetailsData } = useGlobalContext();

  const [servicedata, setService] = useState([]);
  const [selectedRowService, setSelectedRowService] = useState({});
  const [issuesets, setIssueSets] = useState("");
  const [toCompareData, setToCompareData] = useState([]);
  const [sendobject, setSendObject] = useState([]);
  const [NC_Pgme_Part_ID, setNC_Pgme_Part_ID] = useState("");

  let Machine = selectshifttable?.Machine;
  const getMachineTaskAfterMU = () => {
    axios
      .post(baseURL + "/ShiftOperator/MachineTasksData", {
        MachineName: Machine,
      })
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].Qty === 0) {
            response.data[i].rowColor = "#DC143C";
          } else if (response.data[i].QtyAllotted === 0) {
            response.data[i].rowColor = "#E0FFFF";
          } else if (response.data[i].QtyCut === 0) {
            response.data[i].rowColor = "#778899";
          } else if (response.data[i].QtyCut === response.data[i].Qty) {
            response.data[i].rowColor = "#008000";
          } else if (response.data[i].QtyCut === response.data[i].QtyAllotted) {
            response.data[i].rowColor = "#ADFF2F";
          } else if (response.data[i].Remarks !== "") {
            response.data[i].rowColor = "#DC143C";
          }
        }
        setMachinetaskdata(response.data);
      });
  };

  useEffect(() => {
    getMachineTaskAfterMU();
  }, []);

  const materialUsageService = () => {
    axios
      .post(baseURL + "/ShiftOperator/MachineTasksService", {
        NCId: selectProductionReport.Ncid,
      })
      .then((response) => {
        console.log(response.data);
        setService(response.data);
        const data = response.data;
        let count = 0;

        // Iterate through each object in the response data
        data.forEach((item) => {
          // Check if Used or Rejected is zero
          if (item.Used === 1 || item.Rejected === 1) {
            count++;
          }
        });

        // Output the count

        // console.log("Number of objects with Used or Rejected as zero:", count);
        // console.log("selectProductionReport.Qty",selectProductionReport.Qty);

        // If count equals selectProductionReport.Qty, setComplete(true)
        if (count === selectProductionReport.Qty) {
          console.log("conditon 1");
          setComplete(true);
        } else {
          console.log("conditon 2");
          setComplete(false);
        }

        // If count is greater than 0, another row is incremented
        if (count > 0) {
          // Increment another row
        }
      });
  };

  useEffect(() => {
    materialUsageService();
  }, [selectProductionReport]);

  const rowSelectServiceRP = (item, index) => {
    let list = { ...item, index: index };
    setSelectedRowService(list);
  };

  useMemo(() => {
    setSelectedRowService({ ...servicedata[0], index: 0 });
  }, [servicedata[0]]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (
      isNaN(date.getDate()) ||
      isNaN(date.getMonth() + 1) ||
      isNaN(date.getFullYear())
    ) {
      return null;
    }
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onChangeIssueSets = (e) => {
    setIssueSets(e.target.value);
    axios
      .post(baseURL + "/ShiftOperator/onChangeInputField", {
        afterloadService: servicedata,
      })
      .then((response) => {
        // console.log("input change response", response.data);
        setToCompareData(response.data);
      })
      .catch((error) => {
        console.error("Error in axios request", error);
      });
  };

  //onclick of mark as used
  const markAsUsed = () => {
    axios
      .post(baseURL + "/ShiftOperator/getNcProgramId", {
        NcId: selectProductionReport.Ncid,
      })
      .then((response) => {
        const ncPgmePartId = response.data[0].NC_Pgme_Part_ID;
        setNC_Pgme_Part_ID(ncPgmePartId);

        if (issuesets < 0) {
          toast.error("Enter a Positive Number", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // Check if toCompareData is null or empty
          if (!toCompareData || toCompareData.length === 0) {
            toast.error("Parts Quantity  mismatch", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }

          const flattenedToCompareData = toCompareData.flat();
          let hasValidationError = false;

          const updatedservicedata = servicedata.map((item) => {
            const match = flattenedToCompareData.find(
              (data) => data.Cust_BOM_ListId === item.CustBOM_Id
            );

            if (match) {
              const qtyToDistribute = issuesets * match.Quantity;
              const useNow = issuesets * match.Quantity;

              // Check if the quantity to be used exceeds the available quantity
              const remainingQty = item.QtyIssued - item.QtyUsed - issuesets;
              // console.log("QtyIssued is",item.QtyIssued,"QtyUsed is",item.QtyUsed,"issuesets is",issuesets,"remainingQty is",remainingQty);
              if (remainingQty < 0 || qtyToDistribute !== useNow) {
                // console.log("remainingQty is",remainingQty,"qtyToDistribute is",qtyToDistribute,"useNow is",useNow)
                hasValidationError = true;
                return item; // Do not update state if validation fails
              }

              const updatedItem = {
                ...item,
                qtyToDistribute: qtyToDistribute,
                useNow: useNow,
                QtyReturned: useNow,
              };

              const existingSendObjectIndex = sendobject.findIndex(
                (obj) => obj.CustBOM_Id === item.CustBOM_Id
              );
              if (existingSendObjectIndex !== -1) {
                sendobject[existingSendObjectIndex] = {
                  ...sendobject[existingSendObjectIndex],
                  ...updatedItem,
                  NC_Pgme_Part_ID: ncPgmePartId,
                  issuesets: issuesets,
                  NcId: NcId,
                };
              } else {
                sendobject.push({
                  ...updatedItem,
                  NC_Pgme_Part_ID: ncPgmePartId,
                  issuesets: issuesets,
                  NcId: NcProgramId,
                });
              }

              return updatedItem;
            } else {
              // console.log(`Row ${item.CustBOM_Id}: No match found`);
              return item;
            }
          });

          // Display a single Toastify error message if there are errors
          if (hasValidationError) {
            toast.error("Parts Quantity mismatch", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
          setSendObject(sendobject);
          axios
            .post(baseURL + "/ShiftOperator/ServicemarkasUsed", {
              sendobject,
            })
            .then((response) => {
              toast.success("Material Parts Used", {
                position: toast.POSITION.TOP_CENTER,
              });
              // console.log(response.data);
              axios
                .post(baseURL + "/ShiftOperator/MachineTasksService", {
                  NCId: selectProductionReport.Ncid,
                })
                .then((response) => {
                  // console.log("required result", response.data);
                  setService(response?.data);
                  const data = response.data;
                  let count = 0;

                  // Iterate through each object in the response data
                  data.forEach((item) => {
                    // Check if Used or Rejected is zero
                    if (item.Used === 1 || item.Rejected === 1) {
                      count++;
                    }
                  });

                  // Output the count

                  // console.log("Number of objects with Used or Rejected as zero:", count);
                  // console.log("selectProductionReport.Qty",selectProductionReport.Qty);

                  // If count equals selectProductionReport.Qty, setComplete(true)
                  if (count === selectProductionReport.Qty) {
                    console.log("conditon 1");
                    setComplete(true);
                  } else {
                    console.log("conditon 2");
                    setComplete(false);
                  }

                  // If count is greater than 0, another row is incremented
                  if (count > 0) {
                    // Increment another row
                  }
                });
              axios
                .post(baseURL + "/ShiftOperator/getTableTopDeatails", {
                  NCId: selectProductionReport?.Ncid,
                })
                .then((response) => {
                  // console.log(response.data);
                  setRptTopData(response.data);
                  axios
                    .post(baseURL + "/ShiftOperator/getpartDetails", {
                      selectProductionReport,
                    })
                    .then((response) => {
                      // console.log("excuted data refresh func");
                      setPartDetailsData(response.data);
                    });
                  getMachineTaskAfterMU();
                });
            });
        }
      })
      .catch((error) => {
        console.error("Error in axios request", error);
      });
  };

  //onclick of mark as returned
  const markasReturned = () => {
    axios
      .post(baseURL + "/ShiftOperator/getNcProgramId", {
        NcId: selectProductionReport.Ncid,
      })
      .then((response) => {
        const ncPgmePartId = response.data[0].NC_Pgme_Part_ID;
        setNC_Pgme_Part_ID(ncPgmePartId);

        if (issuesets < 0) {
          toast.error("Enter a Positive Number", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // Check if toCompareData is null or empty
          if (!toCompareData || toCompareData.length === 0) {
            toast.error("Parts Quantity is null or mismatch", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }

          const flattenedToCompareData = toCompareData.flat();
          let hasValidationError = false;

          const updatedservicedata = servicedata.map((item) => {
            const match = flattenedToCompareData.find(
              (data) => data.Cust_BOM_ListId === item.CustBOM_Id
            );

            if (match) {
              const qtyToDistribute = issuesets * match.Quantity;
              const useNow = issuesets * match.Quantity;

              // Check if the quantity to be used exceeds the available quantity
              const remainingQty = item.QtyIssued - item.QtyUsed - issuesets;
              if (remainingQty < 0 || qtyToDistribute !== useNow) {
                hasValidationError = true;
                return item; // Do not update state if validation fails
              }

              const updatedItem = {
                ...item,
                qtyToDistribute: qtyToDistribute,
                useNow: useNow,
                QtyReturned: useNow,
              };

              const existingSendObjectIndex = sendobject.findIndex(
                (obj) => obj.CustBOM_Id === item.CustBOM_Id
              );
              if (existingSendObjectIndex !== -1) {
                sendobject[existingSendObjectIndex] = {
                  ...sendobject[existingSendObjectIndex],
                  ...updatedItem,
                  NC_Pgme_Part_ID: ncPgmePartId,
                  issuesets: issuesets,
                  NcId: NcId,
                };
              } else {
                sendobject.push({
                  ...updatedItem,
                  NC_Pgme_Part_ID: ncPgmePartId,
                  issuesets: issuesets,
                  NcId: NcProgramId,
                });
              }

              return updatedItem;
            } else {
              // console.log(`Row ${item.CustBOM_Id}: No match found`);
              return item;
            }
          });

          // Display a single Toastify error message if there are errors
          if (hasValidationError) {
            toast.error("Cannot Use More Parts than issued Quantity", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
          setSendObject(sendobject);
          axios
            .post(baseURL + "/ShiftOperator/markasReturned", {
              sendobject,
            })
            .then((response) => {
              toast.success("Material Parts Returned", {
                position: toast.POSITION.TOP_CENTER,
              });
              // console.log(response.data);
              axios
                .post(baseURL + "/ShiftOperator/MachineTasksService", {
                  NCId: selectProductionReport.Ncid,
                })
                .then((response) => {
                  // console.log("required result", response.data);
                  setService(response?.data);
                  const data = response.data;
                  let count = 0;

                  // Iterate through each object in the response data
                  data.forEach((item) => {
                    // Check if Used or Rejected is zero
                    if (item.Used === 1 || item.Rejected === 1) {
                      count++;
                    }
                  });

                  // Output the count

                  // console.log("Number of objects with Used or Rejected as zero:", count);
                  // console.log("selectProductionReport.Qty",selectProductionReport.Qty);

                  // If count equals selectProductionReport.Qty, setComplete(true)
                  if (count === selectProductionReport.Qty) {
                    console.log("conditon 1");
                    setComplete(true);
                  } else {
                    console.log("conditon 2");
                    setComplete(false);
                  }

                  // If count is greater than 0, another row is incremented
                  if (count > 0) {
                    // Increment another row
                  }
                });
              axios
                .post(baseURL + "/ShiftOperator/getTableTopDeatails", {
                  NCId: selectProductionReport?.Ncid,
                })
                .then((response) => {
                  // console.log(response.data);
                  setRptTopData(response.data);
                });
            });
        }
      })
      .catch((error) => {
        console.error("Error in axios request", error);
      });
  };

  // console.log(selectedRowService)

  //sorting
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const dataCopy = [...servicedata];
    if (sortConfig.key) {
      dataCopy.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return dataCopy;
  };

  // Add a state variable to track whether all rows are selected
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    const allRowsSelected = selectedRowService.length === servicedata.length;
    setSelectedRowService(allRowsSelected ? [] : servicedata);
  };

  return (
    <div>
      {openTable ? (
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
                  <div className="col-md-4 mt-3">
                    <label className="form-label" style={{ fontSize: "10px" }}>
                      Sets Issued :
                    </label>
                  </div>
                  <div className="col-md-6 mt-2">
                    <input
                      className="in-field w-75"
                      style={{ marginTop: "10px" }}
                      onChange={onChangeIssueSets}
                      type="number"
                    />
                  </div>

                  <div className="row d-flex ">
                    <div
                      style={{ textAlign: "center", marginTop: "-14px" }}
                      className="col-md-3"
                    >
                      <div className="mt-2">
                        <button
                          className="button-style mt-2 group-button mt-4 "
                          style={{ width: "120px", fontSize: "14px" }}
                          onClick={markAsUsed}
                        >
                          Mark as Used
                        </button>
                      </div>
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "-14px",
                        marginLeft: "80px",
                        whiteSpace: "nowrap",
                        marginTop: "-5px",
                      }}
                      className="col-md-3"
                    >
                      <button
                        className="button-style mt-2 group-button mt-4"
                        style={{ width: "120px", fontSize: "14px" }}
                        onClick={markasReturned}
                      >
                        Mark as Returned
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {openTable ? (
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
                <th onClick={handleSelectAll}></th>
                <th onClick={() => requestSort("PartId")}>Part Id</th>
                <th onClick={() => requestSort("RV_No")}>RV_No</th>
                <th onClick={() => requestSort("QtyIssued")}>Issued</th>
                <th onClick={() => requestSort("QtyUsed")}>Used</th>
                <th onClick={() => requestSort("QtyReturned")}>Returned</th>
                <th onClick={() => requestSort("0")}>Process Now</th>
              </tr>
            </thead>

            <tbody
              className="tablebody table-space"
              style={{ fontSize: "12px" }}
            >
              {sortedData().map((item, key) => (
                <tr
                  key={key}
                  onClick={() => {
                    rowSelectServiceRP(item, key);
                  }}
                  className={
                    key === selectedRowService?.index ? "selcted-row-clr" : ""
                  }
                >
                  <td></td>
                  <td>{item.PartId}</td>
                  <td>{item.RV_No}</td>
                  <td>{item.QtyIssued}</td>
                  <td>{item.QtyUsed}</td>
                  <td>{item.QtyReturned}</td>
                  <td>0</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}
    </div>
  );
}
