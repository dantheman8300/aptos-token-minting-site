import Header from "@/components/Header";
import WalletList from "@/components/WalletList";
import { useWallet, WalletReadyState } from "@aptos-labs/wallet-adapter-react";

export default function Mint() {

    const {
    connect,
    connected,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction
    } = useWallet();

    const mintCoin = async () => {
    
    }
    
    return (
        <div className="h-screen w-screen bg-base-100">
            <Header
                title="Minting site"
                useWallet={true}
                wallet={account}
                wallets={wallets}
                connect={connect}
                disconnect={disconnect}
                connected={connected}
            />
        </div>
    )
}