import Header from "@/components/Header";
import landingPageHeroPic from "../../public/landing-page.png"
import Image from "next/image"

export default function Home() {

return (
    <div className="bg-base-100 h-screen overflow-hidden">
        <Header 
            title={process.env.COLLECTION_NAME || "FILL COLLECTION_NAME IN .ENV FILE"}
            showSocials={true}
        />
        <div className="hero h-full">
            <div className="hero-content flex-col lg:flex-row">
                <Image src={`https://ipfs.io/ipfs/${process.env.COLLECTION_IMAGE_HASH}`} width={500} height={500} alt="landing page hero banner" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{process.env.COLLECTION_NAME || "FILL COLLECTION_NAME IN .ENV FILE"} Website</h1>
                    <p className="py-6">{process.env.COLLECTION_DESCRIPTION || "FILL COLLECTION_DESCRIPTION IN .ENV FILE"}</p>
                    <div className="flex gap-4">
                        <a href="/mint"><button className="btn btn-primary">Mint!</button></a>
                        <a href="/collection"><button className="btn btn-primary">View my collection</button></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}