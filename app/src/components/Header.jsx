import React, { useEffect, useState } from 'react';
import styles from './headerStyle.css';
import { Toggle, Button, Profile, mq } from '@ensdomains/thorin';
import { useEnsAvatar, useEnsName } from 'wagmi'
import { ConnectButton } from './ConnectButton';

const Header = ({ isToggleOn, onToggle, currentLevel }) => {

    const [toastState, setToastState] = useState(false);

    const getButtonColorClass = () => {
        if (currentLevel === 'subsubarea' && isToggleOn === true) {
            return 'editModeHeader';
        }
        else {
            return 'Header';
        }
    };

    useEffect(() => {
        console.log(currentLevel);
    }, [currentLevel]);

    useEffect(() => {
        console.log(isToggleOn);
    }, [isToggleOn]);

    return (
        <header className={getButtonColorClass()}>
            <h1>HOMM logo(plan){(isToggleOn === true) ? ": edit" : null}</h1>
            {(currentLevel === 'subsubarea') ?

                <div className='toggleSwitch'>
                    <p>Edit Mode</p>
                    <Toggle
                        size="small"
                        id="toggleId"
                        onChange={() => { onToggle(); }}
                    />
                </div>
                : null}

            <div className='ensConnectButton'>
                <ConnectButton />
            </div>
        </header >
    );
}

export default Header;