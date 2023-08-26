import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';
import { Toggle, Button, Profile, mq } from '@ensdomains/thorin';
import { ConnectButton } from './ConnectButton';
import { Container, Layout } from '@/components/templates';

interface HeaderProps {
    isToggleOn: boolean;
    onToggle: () => void;
    currentLevel: 'main' | 'subarea' | 'subsubarea';
}

const Header = ({ isToggleOn, onToggle, currentLevel }: HeaderProps) => {

    const [toastState, setToastState] = useState(false);

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
            <Layout>
                <Container>
                    <ConnectButton />
                </Container>
            </Layout>
        </header >
    );
}

export default Header;