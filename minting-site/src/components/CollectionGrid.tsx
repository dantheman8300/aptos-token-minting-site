import { NFT } from '@/pages/collection'
import Image, { StaticImageData } from 'next/image'



export default function CollectionGrid(
    props: {
        nfts: NFT[]
    }
) {
    const nftCards = props.nfts.map((nft, index) => {
        const truncatedAddress = nft.address.slice(0, 5) + "..." + nft.address.slice(-3)

        console.log("nft", nft)

        return (
            <div className="card shadow-xl rounded-box w-64 h-64">
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
                    <div className="modal-box modal-bottom sm:modal-middle relative flex flex-col">
                        {/* <label htmlFor={`my-modal-${index}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label> */}
                        { nft.image != 'uri' && <Image src={nft.image} width={350} height={350} alt="" className="rounded-box " />}
                        <div className="stats stats-vertical lg:stats-horizontal mt-2">
                            <div className="stat">
                                <div className="stat-title">Name:</div>
                                <div className="stat-value">{nft.name}</div>
                                {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                            </div>
                            <div className="stat">
                                <div className="stat-title">Token address:</div>
                                <div className="stat-value">{truncatedAddress}</div>
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