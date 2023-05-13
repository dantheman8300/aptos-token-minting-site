import { WalletName, useWallet } from "@aptos-labs/wallet-adapter-react";
import Image from "next/image";

export default function WalletList(
    props: {
        wallets: any[], 
        connect: (walletName: WalletName) => void,
    }
) {

    const walletButtons = props.wallets.map((wallet) => {
        return (
            <button
                className="btn btn-ghost min-w-sm"
                key={wallet.name}
                onClick={() => props.connect(wallet.name)}
            >
                <Image className="mr-2" src={wallet.icon} width={20} height={20} alt="wallet icon"/> 
                {wallet.name}
            </button>
        )
    })

    return (
        <div>
            <input type="checkbox" id="wallet-list-modal" className="modal-toggle" />
            <div className="modal">
                <label className="modal-box flex flex-col content-center w-fit" htmlFor="">
                <label htmlFor="wallet-list-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {walletButtons}
                </label>
            </div>    
        </div>
    )
}