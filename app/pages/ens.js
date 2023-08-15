import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

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
        </div>
    );
}

export default ENSPage;