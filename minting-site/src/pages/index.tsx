import Header from "@/components/Header";
import landingPageHeroPic from "../../public/landing-page.png"
import Image from "next/image"

export default function Home() {

return (
    <div className="bg-base-100 h-screen overflow-hidden">
        <Header 
            title="Collection name"
            showSocials={true}
        />
        <div className="hero h-full">
            <div className="hero-content flex-col lg:flex-row">
                <Image src={landingPageHeroPic} alt="landing page hero banner" className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold">Collection website</h1>
                    <p className="py-6">This is your very own NFT minting website! Follow along with Overmind's guide on how to create your own collection and set up your minting site! Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <a href="/mint"><button className="btn btn-primary">Mint!</button></a>
                </div>
            </div>
        </div>
    </div>
)
}