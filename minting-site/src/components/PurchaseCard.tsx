import React from "react";
// import PurchaseImage from '../../public/suipstakes-banner.png';
import Image from 'next/image';
import PurchaseStats from "./PurchaseStats";
import tempPic from '../../public/landing-page.webp';

const TICKET_PRICE = 20;


function PurchaseCard (
  props: {
    mintToken: () => void,
    currentPictureId: number
  }
) {

  return (
    <div className="card card-compact shadow-2xl max-w-lg m-10 bg-secondary " >
      <div className="card-body">
        
        {/* <div className="flex flex-col md:flex-row gap-x-10 items-center"> */}
          <div>
            <Image src={tempPic} alt="Purchase Tickets" className="rounded-xl mb-2"/>
            <h2 className="card-title">Mint token</h2>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Enter ticket amount</span>
              </label>
              <label className="input-group w-full max-w-xs">
                <input 
                  type="text" 
                  id="ticketAmount"
                  placeholder={ticketAmount.toString()} 
                  className={`input input-bordered w-full max-w-xs focus:outline-none`} 
                  onChange={(e) => {
                    updateTicketAmount(e.target.value)
                  }}
                />
                <span className="bg-warning text-warning-content">Tickets</span>
              </label>
            </div> */}
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <label className="input-group w-full max-w-xs">
                <input type="text" placeholder={ticketPrice(ticketAmount)} className="input input-bordered w-full max-w-xs" disabled />
                <span  className="font-mono bg-warning text-warning-content">SUI</span>
              </label>
            </div> */}
            <button className="btn btn-success w-full mt-4 mb-4" onClick={props.mintToken}>Mint</button>
            
          </div>
          {/* <PurchaseStats 
            poolAmount={1000000}
            endTimestamp={1685249942}
            ticketPrice={TICKET_PRICE}
          /> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default PurchaseCard