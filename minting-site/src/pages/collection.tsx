import CollectionGrid from "@/components/CollectionGrid";
import Header from "@/components/Header";

import tempPic from '../../public/landing-page.webp';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useEffect, useState } from "react";
import { AptosClient, IndexerClient, Network, Provider } from "aptos"

import { ArweaveSigner, createData } from "arbundles";

export interface NFT {
    name: string,
    address: string,
    image: string,
}

export default function Collection() {

    const [nfts, setNfts] = useState<NFT[]>([])
    const [tokenBalance, setTokenBalance] = useState(0);

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

                setNfts(nfts)


            })  

        }
    }, [connected])

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
        <div className="bg-base-100 ">
            {/* <Header title="Collection"/> */}
            <Header
                title="Collection name"
                useWallet={true}
                wallet={account}
                wallets={wallets}
                connect={connect}
                disconnect={disconnect}
                connected={connected}
                balance={tokenBalance.toLocaleString()}
            />
            <CollectionGrid nfts={nfts} />
        </div> 
    )
}