import React from 'react';
import Header from '../components/Header';
import GoogleMapComponent from '../components/GoogleMap';

import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'

export default function Home() {
    return (
        <ThemeProvider theme={lightTheme}>
            <ThorinGlobalStyles />
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex-1 overflow-hidden">
                    <GoogleMapComponent />
                </div>
            </div>
        </ThemeProvider>
    );
}
