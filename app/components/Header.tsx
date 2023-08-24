import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Toggle, Button } from '@ensdomains/thorin';
import { Tooltip, TooltipProps } from '@ensdomains/thorin';
import dynamic from 'next/dynamic';

interface HeaderProps {
    isToggleOn: boolean;
    onToggle: () => void;
    currentLevel: 'main' | 'subarea' | 'subsubarea';
}

const Header = ({ isToggleOn, onToggle, currentLevel }: HeaderProps) => {

    const [toastState, setToastState] = useState(false);
    const [isToastVisible, setIsToastVisible] = useState(false);

    const Dropdown = dynamic(() => import('@ensdomains/thorin').then(mod => mod.Dropdown), {
        ssr: false
    });

    const Toast = dynamic(() => import('@ensdomains/thorin').then(mod => mod.Dropdown), {
        ssr: false
    });

    const getButtonColorClass = () => {
        if (currentLevel === 'subsubarea' && isToggleOn === true) {
            return styles.editModeHeader;
        }
        else {
            return styles.Header;
        }
    };

    useEffect(() => {
        console.log(isToggleOn);
    }, [isToggleOn]);

    return (
        <header className={getButtonColorClass()}>
            <h1>HOMM logo(plan){(isToggleOn === true) ? ": edit" : null}</h1>
            {(currentLevel === 'subsubarea') ?

                <div className={styles.toggleSwitch}>
                    <p>Edit Mode</p>
                    <Toggle
                        size="small"
                        id="toggleId"
                        onChange={() => { onToggle(), setToastState(!toastState) }}
                    />
                </div>
                : null}

            <div style={{ zIndex: 2000 }}>
                {/* <Dropdown
                    align="left"
                    items={[
                        {
                            label: 'Dashboard',
                            onClick: () => null,
                            color: 'text'
                        },
                        {
                            label: 'Disconnect',
                            onClick: () => null,
                            color: 'red'
                        },
                    ]}
                    label="Account"
                /> */}
            </div>
        </header >
    );
}

export default Header;