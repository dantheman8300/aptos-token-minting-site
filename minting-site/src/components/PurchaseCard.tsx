import React from "react";
// import PurchaseImage from '../../public/suipstakes-banner.png';
import Image from 'next/image';
import PurchaseStats from "./PurchaseStats";
import tempPic from '../../public/landing-page.webp';

const TICKET_PRICE = 20;


function PurchaseCard (
  props: {
    mintToken: () => void,
    currentPictureId: number,
    connected: boolean,
    minting: boolean,
  }
) {

  return (
    <div className="card card-compact shadow-2xl max-w-lg m-10 bg-secondary " >
      <div className="card-body items-center">
        <Image src={`https://ipfs.io/ipfs/QmSHQq3o6AvBBkw89fy8nU9W7uRcSRWF8HTMUFbnJoaBTM/img_${props.currentPictureId}.png`} alt="Purchase Tickets" width={500} height={500} className="rounded-xl mb-2"/>
        <h2 className="card-title">{process.env.COLLECTION_TOKEN_NAME || "token"} #{props.currentPictureId}</h2>
        <button 
          className="btn btn-success w-full" 
          onClick={props.mintToken}
          disabled={props.connected == false || props.minting == true}
        >
          {props.connected == false ? "Connect wallet to mint" : (props.minting ? "Minting..." : "Mint")}
        </button>
      </div>
    </div>
  )
}

export default PurchaseCard