import React, { useMemo, useState } from "react";
import { Table } from "react-bootstrap";

export default function SideTable({
  printLabelData,
  selectRowPrintLabel,
  selectRow,
}) {
  return (
    <div className="row col-md-12">
      <div className="mt-3 col-md-6">
        <div
          style={{ height: "350px", overflowY: "scroll", overflowX: "scroll" }}
        >
          <Table striped className="table-data border">
            <thead className="tableHeaderBGColor" style={{ fontSize: "12px" }}>
              <tr>
                <th>DwgName</th>
                <th>Qty Nested</th>
                <th>Remarks</th>
              </tr>
            </thead>

            <tbody
              className="tablebody table-space"
              style={{ fontSize: "12px" }}
            >
              {printLabelData.map((item, key) => (
                <tr
                  onClick={() => {
                    selectRowPrintLabel(item, key);
                  }}
                  className={key === selectRow?.index ? "selcted-row-clr" : ""}
                >
                  {" "}
                  <td>{item.DwgName}</td>
                  <td>{item.QtyNested}</td>
                  <td>{item.Remarks}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
