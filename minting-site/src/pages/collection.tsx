import CollectionGrid from "@/components/CollectionGrid";
import Header from "@/components/Header";

import tempPic from '../../public/landing-page.webp';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { AptosClient, IndexerClient, Network, Provider } from "aptos"
import Image from "next/image"

export interface NFT {
    name: string,
    address: string,
    image: string,
}

export default function Collection() {

    const [nfts, setNfts] = useState<NFT[]>([])
    const [tokenBalance, setTokenBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const {
        connect,
        connected,
        disconnect,
        account,
        wallets,
        signAndSubmitTransaction,
        network
    } = useWallet();

    useEffect(() => {
        if (!connected) {
            return
        } else {
            if (process.env.COLLECTION_OWNER_ACCOUNT === undefined || process.env.COLLECTION_NAME === undefined) {
                return
            }

            if (account === null) {
                return
            }

            

            getTokens().then((tokens) => {
                console.log("tokens", tokens)

                if (tokens === undefined) {
                    return
                }

                const nfts: NFT[] = []

                tokens.current_token_ownerships_v2.forEach((token: any) => {
                    console.log("token", token)
                    nfts.push({
                        name: token.current_token_data.token_name,
                        address: token.storage_id,
                        image: token.current_token_data.token_uri,
                    })
                })

                if (nfts.length === 0) {
                    nfts.push({
                        name: "No NFTs",
                        address: "0x0",
                        image: `https://ipfs.io/ipfs/${process.env.COLLECTION_IMAGE_HASH}`,
                    })
                }

                setNfts(nfts)
                setIsLoading(false)


            })  

        }
    }, [connected, account])

    const getTokenBalance = async () => {
        if (process.env.COLLECTION_OWNER_ACCOUNT === undefined || process.env.COLLECTION_NAME === undefined || process.env.COLLECTION_ADDRESS === undefined) {
            return
        }

        if (account === null) {
            return
        }

        console.log("account", account)

        console.log("creating indexer client")
        // const indexerClient = new IndexerClient("https://fullnode.devnet.aptoslabs.com")
        // const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
        const provider = new Provider(Network.DEVNET);

        console.log("getting tokens")
        // const tokens = await provider.getTokenOwnedFromCollectionNameAndCreatorAddress(
        //     account.address,
        //     process.env.COLLECTION_NAME,
        //     process.env.COLLECTION_OWNER_ACCOUNT,
        // )

        // const collectionRes = await provider.getAccountResources(process.env.COLLECTION_ADDRESS);
        // console.log("collection", collectionRes);

        const tokenCount = await provider.getAccountTokensCount(account.address)

        console.log("tokenCount", tokenCount)

        const collectionData = await provider.getCollectionData(
            process.env.COLLECTION_OWNER_ACCOUNT, 
            process.env.COLLECTION_NAME
        )

        console.log("collectionData", collectionData)

        const tokens = await provider.getTokenOwnedFromCollectionAddress(
            account.address,
            process.env.COLLECTION_ADDRESS,
            
        )

        console.log("tokens", tokens)

        return tokens.current_token_ownerships_v2.length
    }

    // Fetch collection info and get current picture id from supply
    useEffect(() => {
        getTokenBalance().then((balance) => {
            console.log("balance", balance);
            setTokenBalance(balance || 0);
        })
        
    });


    const getTokens = async () => {
        if (process.env.COLLECTION_OWNER_ACCOUNT === undefined || process.env.COLLECTION_NAME === undefined || process.env.COLLECTION_ADDRESS === undefined) {
            return
        }

        if (account === null) {
            return
        }

        console.log("account", account)

        console.log("creating indexer client")
        // const indexerClient = new IndexerClient("https://fullnode.devnet.aptoslabs.com")
        // const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
        const provider = new Provider(Network.DEVNET);

        console.log("getting tokens")
        // const tokens = await provider.getTokenOwnedFromCollectionNameAndCreatorAddress(
        //     account.address,
        //     process.env.COLLECTION_NAME,
        //     process.env.COLLECTION_OWNER_ACCOUNT,
        // )

        // const collectionRes = await provider.getAccountResources(process.env.COLLECTION_ADDRESS);
        // console.log("collection", collectionRes);

        const tokenCount = await provider.getAccountTokensCount(account.address)

        console.log("tokenCount", tokenCount)

        const collectionData = await provider.getCollectionData(
            process.env.COLLECTION_OWNER_ACCOUNT, 
            process.env.COLLECTION_NAME
        )

        console.log("collectionData", collectionData)

        const tokens = await provider.getTokenOwnedFromCollectionAddress(
            account.address,
            process.env.COLLECTION_ADDRESS,
            
        )

        console.log("tokens", tokens)

        return tokens
    }

    return (
        <div className="flex flex-col h-screen bg-base-100 items-center">
            {/* <Header title="Collection"/> */}
            <Header
                title={process.env.COLLECTION_NAME || "FILL COLLECTION_NAME IN .ENV FILE"}
                useWallet={true}
                wallet={account}
                wallets={wallets}
                connect={connect}
                disconnect={disconnect}
                connected={connected}
                balance={tokenBalance.toLocaleString()}
            />
            {
                connected &&
                isLoading &&
                <div className="toast toast-center toast-middle">
                    <div className="alert">
                        <span className="loading loading-spinner loading-lg"></span>
                        <span>Loading...</span>
                    </div>
                </div>
            }
            {
                connected &&
                !isLoading &&
                <div className="flex-grow bg-base-100">
                    <CollectionGrid nfts={nfts} network={network?.name}  />
                </div>
            }
            {
                !connected &&
                <div className="flex flex-grow justify-content items-center">
                    <div className="card card-compact w-fit h-fit bg-base-100 shadow-xl">
                        <figure><Image src={`https://ipfs.io/ipfs/${process.env.COLLECTION_IMAGE_HASH}`} width={200} height={200} alt="landing page hero banner" className="max-w-sm rounded-lg shadow-2xl" /></figure>
                        <div className="card-body items-center">
                            <h2 className="card-title">Wallet not connected!</h2>
                            <p>Connect wallet to view collection</p>
                        </div>
                    </div>
                </div>
            }
        </div> 
    )
}