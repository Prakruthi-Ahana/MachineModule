import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import PrintSelectedPdf from './PrintSelectedPdf';

export default function PrintSelectedModal({openPrintSelect,setOpenPrintSelected,selectRow}) {
  const [fullscreen, setFullscreen] = useState(true);

 console.log(selectRow)
  return (
    <>
      <Modal show={openPrintSelect} fullscreen={fullscreen} onHide={() => setOpenPrintSelected(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <PrintSelectedPdf selectRow={selectRow}/>
        </Modal.Body>
      </Modal>
    </>
  );
}
