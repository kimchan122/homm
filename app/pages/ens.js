import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Button, LockSVG } from '@ensdomains/thorin';

function ENSPage() {
    const [ethereumAddress, setEthereumAddress] = useState('');

    useEffect(() => {
        async function fetchEthereumAddress() {
            if (window.ethereum) {
                try {
                    await window.ethereum.enable();
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();

                    if (accounts.length > 0) {
                        setEthereumAddress(accounts[0]);
                    } else {
                        setEthereumAddress('Not connected');
                    }
                } catch (error) {
                    console.error(error);
                    setEthereumAddress('Error connecting');
                }
            } else {
                setEthereumAddress('No wallet detected');
            }
        }

        fetchEthereumAddress();
    }, []);

    return (
        <div>
            <h1>ENS Practice</h1>
            <p>Ethereum Address: {ethereumAddress}</p>
            <div style={{ width: '180px' }}>
                <ThemeProvider theme={lightTheme}>
                    <ThorinGlobalStyles />
                    <Button prefix={<LockSVG />} variant="primary">
                        Connect Wallet
                    </Button>
                </ThemeProvider >
            </div>
        </div>

    );
}

export default ENSPage;