import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ThemeProvider } from 'styled-components';
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin';
import { WagmiConfig } from 'wagmi';
import { AppProps } from 'next/app';

import '../styles/css/globals.css';
import '../styles/css/satoshi.css';
import { chains, wagmiConfig } from '../providers';
import { useEffect, useState } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <ThemeProvider theme={lightTheme} >
                    <ThorinGlobalStyles />
                    {isMounted && <Component {...pageProps} />}
                    {/* <Component {...pageProps} /> */}
                </ThemeProvider >
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;
