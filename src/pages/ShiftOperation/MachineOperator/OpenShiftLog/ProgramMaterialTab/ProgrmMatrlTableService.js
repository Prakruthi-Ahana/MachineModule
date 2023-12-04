import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useGlobalContext } from "../../../../../Context/Context";
import { useMemo } from "react";
import axios from "axios";
import { baseURL } from "../../../../../api/baseUrl";
import { toast } from "react-toastify";
import GlobalModal from "../../GlobalModal";

export default function ProgrmMatrlTableService({
  showTable,
  selectshifttable,
}) {
  const {
    afterloadService,
    setAfterloadService,
    NcId,
    servicetopData,
    NcProgramId,
  } = useGlobalContext();

  const [rowSelectService, setRowSelectService] = useState({});
  const rowSelectPMService = (item, index) => {
    let list = { ...item, index: index };
    setRowSelectService(list);
  };

  useMemo(() => {
    // console.log("afterRefreshData[0]:", afterRefreshData[0]);
    setRowSelectService({ ...afterloadService[0], index: 0 });
  }, [afterloadService[0]]);

  console.log(rowSelectService);

  const [issuesets, setIssueSets] = useState("");
  const [toCompareData, setToCompareData] = useState([]);
  let QtyUsed = "";
  let QtyReturned = "";
  let Qty = "";
  const onChangeIssueSets = (e) => {
    setIssueSets(e.target.value);
    axios
      .post(baseURL + "/ShiftOperator/onChangeInputField", {
        afterloadService,
      })
      .then((response) => {
        console.log("input change response", response.data);
        setToCompareData(response.data);
      })
      .catch((error) => {
        console.error("Error in axios request", error);
      });
  };

  const [sendobject, setSendObject] = useState([]);
  const [modalopen, setModalOpen] = useState("");
  const [NC_Pgme_Part_ID, setNC_Pgme_Part_ID] = useState("");
  let qtyToDistribute = "";

  const markAsUsed = () => {
    axios
      .post(baseURL + "/ShiftOperator/getNcProgramId", {
        NcId: NcId,
      })
      .then((response) => {
        // Explicitly set NC_Pgme_Part_ID to response data
        const ncPgmePartId = response.data[0].NC_Pgme_Part_ID;
        setNC_Pgme_Part_ID(ncPgmePartId);
  
        if (issuesets < 0) {
          toast.error("Enter a Positive Number", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          // Flatten toCompareData array
          const flattenedToCompareData = toCompareData.flat();
  
          // Flag to check if any item violates the condition
          let hasValidationError = false;
  
          // Calculate qtyToDistribute and useNow for each item in afterloadService
          const updatedAfterloadService = afterloadService.map((item) => {
            const match = flattenedToCompareData.find(
              (data) => data.Cust_BOM_ListId === item.CustBOM_Id
            );
  
            if (match) {
              const qtyToDistribute = issuesets * match.Quantity;
              const useNow = issuesets * match.Quantity;
  
              // Check if the quantity to be used exceeds the available quantity
              const remainingQty = item.QtyIssued - item.QtyUsed - issuesets;
              if (remainingQty < 0) {
                hasValidationError = true;
                return item; // Do not update state if validation fails
              }
  
              // Update QtyReturned in afterloadService
              const updatedItem = {
                ...item,
                qtyToDistribute: qtyToDistribute,
                useNow: useNow,
                QtyReturned: useNow, // Update QtyReturned
              };
  
              // Add the relevant properties to sendobject based on CustBOM_Id
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
              console.log(`Row ${item.CustBOM_Id}: No match found`);
              return item;
            }
          });
  
          // Update the state after calculating useNow and updating QtyReturned values
          setAfterloadService(updatedAfterloadService);
          // Set the updated sendobject state
          setSendObject(sendobject);
  
          // Display a single Toastify error message if there are errors
          if (hasValidationError) {
            toast.error("Cannot Use More Parts than issued Quantity", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            // Open the modal if no errors
            setModalOpen(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error in axios request", error);
      });
  };
  
  

  // console.log(sendobject);

  const onClickofYes = () => {
    axios
      .post(baseURL + "/ShiftOperator/ServicemarkasUsed", {
        sendobject,
      })
      .then((response) => {
        console.log(response.data);
        axios
          .post(baseURL + "/ShiftOperator/ServiceAfterpageOpen", {
            selectshifttable,
            NcId,
          })
          .then((response) => {
            console.log("required result", response.data);
            setAfterloadService(response?.data);
            if (!response.data) {
              setAfterloadService([]);
            }
          });
      })
      .catch((error) => {
        console.error("Error in axios request", error);
      });
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <GlobalModal
        show={modalopen}
        title="magod_machine"
        content={<>Do you wish to Mark {issuesets} as Used?</>}
        onYesClick={onClickofYes}
        onNoClick={handleClose}
        onClose={handleClose}
      />

      {showTable ? (
        <div className="mt-2">
          <div className="col-md-12 col-sm-12">
            <div className="ip-box form-bg ">
              <div className="row col-md-12 mb-2">
                <div
                  className="col-md-3 "
                  style={{ marginTop: "-10px", marginLeft: "-5px" }}
                >
                  <label
                    className="form-label"
                    style={{ fontSize: "10px", marginLeft: "-15px" }}
                  >
                    IV No :{servicetopData[0]?.IV_No}
                  </label>
                </div>
                <div className="col-md-3" style={{ marginTop: "-10px" }}>
                  <label
                    className="form-label"
                    style={{ fontSize: "10px", marginLeft: "-45px" }}
                  >
                    Issue Date :{formatDate(servicetopData[0]?.Issue_date)}
                  </label>
                </div>

                <div
                  className="col-md-3"
                  style={{ marginTop: "-10px", marginLeft: "-10px" }}
                >
                  <label className="form-label" style={{ fontSize: "10px" }}>
                    Used :{servicetopData[0]?.QtyUsed}
                  </label>
                </div>

                <div className="col-md-3" style={{ marginTop: "-10px" }}>
                  <label
                    className="form-label"
                    style={{ fontSize: "10px", marginLeft: "-15px" }}
                  >
                    Sets Issued :{servicetopData[0]?.QtyIssued}
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
                      onChange={onChangeIssueSets}
                      type="number"
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
                          onClick={markAsUsed}
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
      ) : null}
      {showTable ? (
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

            <tbody
              className="tablebody table-space"
              style={{ fontSize: "12px" }}
            >
              {afterloadService.map((item, key) => {
                return (
                  <>
                    <tr
                      onClick={() => {
                        rowSelectPMService(item, key);
                      }}
                      className={
                        key === rowSelectService?.index ? "selcted-row-clr" : ""
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
      ) : null}
    </div>
  );
}
