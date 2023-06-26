import Header from "@/components/Header";
import landingPageHeroPic from "../../public/landing-page.png"
import Image from "next/image"

export default function Home() {

return (
    <div className="bg-base-100 h-screen overflow-hidden">
        <Header 
            title={process.env.COLLECTION_NAME || "Collection Name"}
            showSocials={true}
        />
        <div className="hero h-full">
            <div className="hero-content flex-col lg:flex-row">
                <Image src={landingPageHeroPic} alt="landing page hero banner" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">{process.env.COLLECTION_NAME || "Collection Name"} Website</h1>
                    <p className="py-6">{process.env.COLLECTION_DESCRIPTION}</p>
                    <a href="/mint"><button className="btn btn-primary">Mint!</button></a>
                </div>
            </div>
        </div>
    </div>
)
}