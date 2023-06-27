import React, { useEffect } from "react";
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

  const [soldOut, setSoldOut] = React.useState(false);

  useEffect(() => {
    if (process.env.COLLECTION_MAX_SUPPLY == undefined) {
      console.log("Error: COLLECTION_MAX_SUPPLY not defined in .env file");
      return
    }

    if (props.currentPictureId >= parseInt(process.env.COLLECTION_MAX_SUPPLY)) {
      setSoldOut(true);
    }
  }, [props.currentPictureId]);

  return (
    <div className="card card-compact shadow-2xl max-w-lg m-10 bg-secondary " >
      <div className="card-body items-center">
        <Image src={soldOut ? `https://ipfs.io/ipfs/${process.env.COLLECTION_GENERAL_IMAGE_HASH}` : `https://ipfs.io/ipfs/${process.env.COLLECTION_IMAGES_HASH}/img_${props.currentPictureId}.png`} alt="Purchase Tickets" width={500} height={500} className="rounded-xl mb-2"/>
        {
          !soldOut &&
          <h2 className="card-title">{process.env.COLLECTION_NAME || "FILL IN .ENV FILE"} #{props.currentPictureId}/{process.env.COLLECTION_MAX_SUPPLY || "FILL IN .ENV FILE"}</h2>
        }
        <button 
          className="btn btn-success w-full" 
          onClick={props.mintToken}
          disabled={props.connected == false || props.minting == true || soldOut}
        >
          {props.connected == false ? "Connect wallet to mint" : (props.minting ? "Minting..." : (soldOut ? "Collection sold out" : "Mint"))}
        </button>
      </div>
    </div>
  )
}

export default PurchaseCard