import React from 'react'

export default function HeadForm() {
  return (
    <div>
        <div className="col-md-12">
        <div className="">
          <h4 className="title">Program Parts List</h4>
        </div>
      </div>

      <div className='bg-light row mt-2 col-md-12'>
        <div className="col-md-2 mb-1">
          <label className="form-label">Enter NC Program No</label>
          <input type='text'></input>
        </div>
        
        <div className="col-md-3">
            <button className="button-style mt-4 group-button"
              style={{ width: "150px"}}>
              Load Program
            </button>
        </div>

        <div className="col-md-3" style={{marginLeft:'-116px'}}>
            <button className="button-style mt-4 group-button"
                style={{ width: "150px"}}>
                Print All
            </button>
        </div>

        <div className='col-md-3' style={{marginLeft:'-116px'}}>
              <button className="button-style mt-4 group-button"
                style={{ width: "150px"}}>
                Print Selected
              </button>
        </div>
    </div>
      
    </div>
  )
}
