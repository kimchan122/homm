import React, { useState } from 'react';
import Header from '../components/Header';
import GoogleMapComponent from '../components/GoogleMap';

import { ThemeProvider } from 'styled-components';
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin';

export default function Home() {
    const [isToggleOn, setIsToggleOn] = useState<boolean>(false);
    const [currentLevel, setCurrentLevel] = useState<'main' | 'subarea' | 'subsubarea'>('main');

    const handleToggle = () => {
        setIsToggleOn(prev => !prev);
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <ThorinGlobalStyles />
            <div className="flex flex-col h-screen">
                <Header currentLevel={currentLevel} isToggleOn={isToggleOn} onToggle={handleToggle} />
                <div className="flex-1 overflow-hidden">
                    <GoogleMapComponent currentLevel={currentLevel} setCurrentLevel={setCurrentLevel} isToggleOn={isToggleOn} />
                </div>
            </div>
        </ThemeProvider >
    );
}
