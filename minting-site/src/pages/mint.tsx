import Header from "@/components/Header";
import { useWallet, WalletReadyState } from "@aptos-labs/wallet-adapter-react";
import { Provider, Network } from "aptos";

const provider = new Provider(Network.DEVNET);

export default function Mint() {

    const {
    connect,
    connected,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction,
    } = useWallet();

    const mintCoin = async () => {
        if (!account) return [];
        // build a transaction payload to be submited
        const payload = {
            type: "entry_function_payload",
            function: `${'0x4'}::aptos_token::mint`,
            type_arguments: [],
            arguments: [],
        };
        try {
            // sign and submit transaction to chain
            const response = await signAndSubmitTransaction(payload);
            // wait for transaction
            await provider.waitForTransaction(response.hash);
            // setAccountHasList(true);
        } catch (error: any) {
            // setAccountHasList(false);
            console.error(error);
        }
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
            <button onClick={mintCoin}>Mint</button>
        </div>
    )
}