// import './App.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Header from './components/Header';

import { WagmiConfig, useEnsAvatar, useEnsName } from 'wagmi';
import { chains, wagmiConfig } from './providers';

function App() {

  const [isToggleOn, setIsToggleOn] = useState(false);
  const [currentLevel, setCurrentLevel] = useState('main');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleToggle = () => {
    setIsToggleOn(prev => !prev);
  };

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        {isMounted &&
          <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
            <ThemeProvider theme={lightTheme}>
              <ThorinGlobalStyles />
              <Header currentLevel={currentLevel} isToggleOn={isToggleOn} onToggle={handleToggle} />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Main currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} isToggleOn={isToggleOn} />} />
                </Routes>
              </BrowserRouter>
            </ThemeProvider >
          </div>
        }
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
