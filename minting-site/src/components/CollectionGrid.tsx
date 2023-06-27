import { NFT } from '@/pages/collection'
import Image, { StaticImageData } from 'next/image'



export default function CollectionGrid(
    props: {
        nfts: NFT[],
        network?: string
    }
) {
    const nftCards = props.nfts.map((nft, index) => {

        if (nft.address == "0x0") {
            return (
                <div className="card card-compact shadow-xl rounded-box w-fit h-fit ">
                    <div className="card-body items-center">
                        <figure>
                            { nft.image != 'uri' && <Image src={nft.image } width={150} height={150} alt="" className="rounded-box" />}
                        </figure>
                        <h2 className="card-title">{nft.name}</h2>
                        <div className="justify-center card-actions">
                            <a href='/mint' className="btn btn-primary">Mint NFT</a>
                        </div>
                    </div>
                </div>
            )
        }

        const truncatedAddress = nft.address.slice(0, 5) + "..." + nft.address.slice(-3)

        // console.log("nft", nft)

        return (
            <div className="card card-compact shadow-xl rounded-box w-fit h-fit ">
                <div className="card-body">
                    <figure>
                        { nft.image != 'uri' && <Image src={nft.image } width={150} height={150} alt="" className="rounded-box" />}
                    </figure>
                    <div className="justify-center card-actions">
                        <label htmlFor={`my-modal-${index}`} className="btn btn-primary">Details</label>
                    </div>
                </div>
                <input type="checkbox" id={`my-modal-${index}`} className="modal-toggle" />
                <label className="modal" htmlFor={`my-modal-${index}`}>
                    <div className="modal-box modal-bottom sm:modal-middle relative flex flex-col overflow-x-hidden">
                        {/* <label htmlFor={`my-modal-${index}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label> */}
                        { nft.image != 'uri' && <Image src={nft.image} width={450} height={450} alt="" className="rounded-box " />}
                        <div className="stats stats-vertical lg:stats-horizontal mt-2">
                            <div className="stat">
                                <div className="stat-title">Name:</div>
                                <div className="stat-value">{nft.name}</div>
                                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                            </div>
                            <div className="stat">
                                <div className="stat-title">Token address:</div>
                                {
                                    props.network ? 
                                    <a href={`https://explorer.aptoslabs.com/?network=${props.network}`} target="_blank" rel="noopener noreferrer">
                                        <div className="stat-value link">{truncatedAddress}</div>
                                    </a>
                                    :
                                    <div className="stat-value">{truncatedAddress}</div>
                                }
                            </div>
                        </div>
                    </div>
                </label>
            </div>
        )
    })

    return (
        <div className="flex flex-wrap gap-6 justify-center p-4">
            {nftCards}
        </div>
    )
}