import CollectionGrid from "@/components/CollectionGrid";
import Header from "@/components/Header";

import tempPic from '../../public/landing-page.webp';

export default function Collection() {
  return (
    <div className="bg-base-100">
      <Header title="Collection"/>
      <CollectionGrid nfts={[
        {
          name: "NFT #1",
          address: "0xf5765b8561238764a44ebfea94abffd8c4f5f33a1f88d5888ee7e15a430b13a5",
          image: tempPic,
        },
        {
          name: "NFT #2",
          address: "0x1234",
          image: tempPic,
        },
        {
          name: "NFT #3534",
          address: "0xf5765b8561238764a44ebfea94abffd8c4f5f33a1f88d5888ee7e15a430b13a5",
          image: tempPic,
        },
        {
          name: "NFT #4",
          address: "0x1234",
          image: tempPic,
        },
        {
          name: "NFT #5",
          address: "0x1234",
          image: tempPic,
        },
        {
          name: "NFT #6",
          address: "0x1234",
          image: tempPic,
        },
        {
          name: "NFT #7",
          address: "0x1234",
          image: tempPic,
        },
      ]} />
    </div> 
  )
}