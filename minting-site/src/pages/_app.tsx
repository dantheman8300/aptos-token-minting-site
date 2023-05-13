import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'

import { PetraWallet } from "petra-plugin-wallet-adapter";
import { MartianWallet } from '@martianwallet/aptos-wallet-adapter';
import { RiseWallet } from '@rise-wallet/wallet-adapter';
import { PontemWallet } from '@pontem/wallet-adapter-plugin';
import { FewchaWallet } from 'fewcha-plugin-wallet-adapter';
import { MSafeWalletAdapter } from 'msafe-plugin-wallet-adapter';

export default function App({ Component, pageProps }: AppProps) {
    const wallets = [
        new PetraWallet(), 
        new MartianWallet(), 
        new RiseWallet(),
        new PontemWallet(),
        new FewchaWallet(),
        new MSafeWalletAdapter()
    ];
    return (
        <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
            <Component {...pageProps} />
        </AptosWalletAdapterProvider>
    )
}
