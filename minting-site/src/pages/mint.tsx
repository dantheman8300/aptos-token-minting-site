import Header from "@/components/Header";
import PurchaseCard from "@/components/PurchaseCard";
import { useWallet, WalletReadyState } from "@aptos-labs/wallet-adapter-react";
import { Provider, Network, AptosAccount, TxnBuilderTypes, BCS, AptosClient, FaucetClient } from "aptos";
import { useState } from "react";

const {
    AccountAddress,
    TypeTagStruct,
    EntryFunction,
    StructTag,
    TransactionPayloadEntryFunction,
    RawTransaction,
    ChainId,
  } = TxnBuilderTypes;

// convert private key hex string to unit8array
const privateKey = new Uint8Array(
    Buffer.from(
        process.env.PRIV_KEY || "",  
        "hex"
    )
);


const minter = new AptosAccount(
    privateKey,
    process.env.COLLECTION_OWNER_ACCOUNT
);

export default function Mint() {

    const [toast, setToast] = useState(<></>);

    const {
    connect,
    connected,
    disconnect,
    account,
    wallets,
    signAndSubmitTransaction,
    } = useWallet();

    // const mintCoin = async () => {
    //     if (!account) return [];
    //     // build a transaction payload to be submited
    //     const payload = {
    //         type: "entry_function_payload",
    //         function: `0x4::aptos_token::mint`,
    //         type_arguments: [],
    //         arguments: [
    //             "DanCoin",
    //             "my collection",
    //             "DanCoin",
    //             "uri",
    //             [], 
    //             [],
    //             []
    //         ],
    //     };
    //     try {
    //         // sign and submit transaction to chain
    //         const response = await signAndSubmitTransaction(payload);
    //         // wait for transaction
    //         await provider.waitForTransaction(response.hash);
    //         // setAccountHasList(true);
    //     } catch (error: any) {
    //         // setAccountHasList(false);
    //         console.error(error);
    //     }
    // }

    const getResources = async () => {
        if (!account) return [];

        const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
        const faucetClient = new FaucetClient("https://fullnode.devnet.aptoslabs.com", "https://faucet.devnet.aptoslabs.com");

        if (process.env.COLLECTION_ADDRESS === undefined) {
            console.log("missing collection address")
            return;
        }

        let resources = await client.getAccountResources(process.env.COLLECTION_ADDRESS);
        console.log("collection", resources);

        resources = await client.getAccountResources(account.address);
        console.log("account", resources);

    }

    const mintCoin = async () => {

        if (!account) return [];

        setToast(
            <div className="alert alert-info">
                <div>
                    <span>Minting NFT...</span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg> */}
                    <button onClick={() => setToast(<></>)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            </div>
        )

        console.log("creating client")
        const client = new AptosClient("https://fullnode.devnet.aptoslabs.com");
        const faucetClient = new FaucetClient("https://fullnode.devnet.aptoslabs.com", "https://faucet.devnet.aptoslabs.com");

        // console.log("funding account")
        // await faucetClient.fundAccount(minter.address(), 100_000_000);

        console.log("creating entry function payload")
        const entryFunctionPayload = new TransactionPayloadEntryFunction(
            EntryFunction.natural(
                "0x4::aptos_token",
                "mint", 
                [],
                [
                    BCS.bcsSerializeStr("DanCoin"),
                    BCS.bcsSerializeStr("my collection"),
                    BCS.bcsSerializeStr("DanCoin"),
                    BCS.bcsSerializeStr("uri"),
                    BCS.bcsSerializeStr(""), 
                    BCS.bcsSerializeStr(""),
                    BCS.bcsSerializeStr("")
                ]
            )
        )

        console.log("getting addtional info")
        const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
            client.getAccount(minter.address()),
            client.getChainId(),
        ]);

        console.log("creating raw transaction")
        const rawTxn = new RawTransaction(
            // Transaction sender account address
            AccountAddress.fromHex(minter.address()),
            BigInt(sequenceNumber),
            entryFunctionPayload,
            // Max gas unit to spend
            BigInt(2000),
            // Gas price per unit
            BigInt(100),
            // Expiration timestamp. Transaction is discarded if it is not executed within 10 seconds from now.
            BigInt(Math.floor(Date.now() / 1000) + 10),
            new ChainId(chainId),
        );

        // Sign the raw transaction with account1's private key
        console.log("signing transaction")
        const bcsTxn = AptosClient.generateBCSTransaction(minter, rawTxn);
        
        console.log("submitting transaction")
        let pendingTransactionRes = await client.submitSignedBCSTransaction(bcsTxn);

        let transactionRes = await client.waitForTransactionWithResult(pendingTransactionRes.hash) as any

        console.log(transactionRes);

        if (transactionRes.success === false) {
            setToast(
                <div className="alert alert-error">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span>Failed to mint NFT</span>
                        <button onClick={() => setToast(<></>)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            )
            return;
        }

        const tokenAddress = transactionRes.events[0].data.token;

        console.log("token address", tokenAddress);

        let tokenResources = await client.getAccountResources(tokenAddress);

        console.log("token resources", tokenResources);

        console.log("account address", account.address);

        // const token = new TypeTagStruct(StructTag.fromString("0x4::token::Token"));

        console.log("creating entry function payload")
        const entryFunctionPayload2 = new TransactionPayloadEntryFunction(
            EntryFunction.natural(
                "0x1::object",
                "transfer_call", 
                [],
                [
                    new Uint8Array(
                        Buffer.from(
                            tokenAddress.replace("0x", ""),  
                            "hex"
                        )
                    ),
                    new Uint8Array(
                        Buffer.from(
                            account.address.replace("0x", ""),  
                            "hex"
                        )
                    ),
                ]
            )
        )

        console.log("getting addtional info")
        const [{ sequence_number: sequenceNumber2 }, chainId2] = await Promise.all([
            client.getAccount(minter.address()),
            client.getChainId(),
        ]);

        console.log("creating raw transaction")
        const rawTxn2 = new RawTransaction(
            // Transaction sender account address
            AccountAddress.fromHex(minter.address()),
            BigInt(sequenceNumber2),
            entryFunctionPayload2,
            // Max gas unit to spend
            BigInt(2000),
            // Gas price per unit
            BigInt(100),
            // Expiration timestamp. Transaction is discarded if it is not executed within 10 seconds from now.
            BigInt(Math.floor(Date.now() / 1000) + 10),
            new ChainId(chainId2),
        );

        // Sign the raw transaction with account1's private key
        console.log("signing transaction")
        const bcsTxn2 = AptosClient.generateBCSTransaction(minter, rawTxn2);
        
        console.log("submitting transaction")
        let pendingTransactionRes2 = await client.submitSignedBCSTransaction(bcsTxn2);

        let transactionRes2 = await client.waitForTransactionWithResult(pendingTransactionRes2.hash) as any

        console.log(transactionRes2);

        if (transactionRes2.success === false) {
            setToast(
                <div className="alert alert-error">
                    <div>
                        <span>Failed to mint NFT</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <button onClick={() => setToast(<></>)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                </div>
            )
            // TODO burn the token
            return;
        }

        tokenResources = await client.getAccountResources(tokenAddress);

        console.log("token resources", tokenResources);

        let accountResources = await client.getAccountResources(account.address);

        console.log("account resources", accountResources);

        setToast(
            <div className="alert alert-success">
                <div>
                    <span>NFT minted!</span>
                    <a href="collection"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><g fill="none" fill-rule="evenodd"><path d="M18 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h5M15 3h6v6M10 14L20.2 3.8"/></g></svg></a>
                    <button onClick={() => setToast(<></>)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="butt" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="bg-base-100 items-center">
            <Header
                title="Collection name"
                useWallet={true}
                wallet={account}
                wallets={wallets}
                connect={connect}
                disconnect={disconnect}
                connected={connected}
                balance={"0"}
            />
            {/* <button onClick={mintCoin}>Mint</button> */}
            <PurchaseCard 
                mintToken={mintCoin}
                currentPictureId={1}
            />
            <button onClick={getResources}>Get Resources</button>
            <div className="toast toast-end toast-bottom">
                {toast}
            </div>
        </div>
    )
}