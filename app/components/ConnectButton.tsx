// from 'ENS Frontend Examples'
import { Button, Profile, mq } from '@ensdomains/thorin'
import { ConnectButton as ConnectButtonBase } from '@rainbow-me/rainbowkit'
import { useDisconnect } from 'wagmi'
import styled, { css } from 'styled-components'
import HommPlatform from '../contract/HommPlatform';
import { useEffect } from 'react';

const StyledButton = styled(Button)`
  ${({ theme }) => css`
    width: fit-content;

    ${mq.xs.min(css`
      min-width: ${theme.space['45']};
    `)}
  `}
`

export function ConnectButton() {
    const { disconnect } = useDisconnect();

    const platform = typeof window !== 'undefined' && window.ethereum
        ? new HommPlatform(window.ethereum)
        : null;



    return (
        <ConnectButtonBase.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                // useEffect(() => {
                //     if (connected && platform) {
                //         console.log(connected);
                //         console.log(platform);
                //         platform.signUpUser()
                //             .then(() => {
                //                 console.log('Successfully signed up user!');
                //             })
                //             .catch(error => {
                //                 console.error('Error during signUp:', error);
                //             });
                //     }
                // }, [connected, platform]);

                // useEffect(() => {
                //     if (connected && platform && account && account.address) {

                //         platform.getUser(account.address)
                //             .then(isUser => {
                //                 console.log('Is user:', isUser);
                //             })
                //             .catch(error => {
                //                 console.error('Error during getUser call:', error);
                //             });
                //     }
                // }, [connected, platform, account]);

                useEffect(() => {
                    console.log(account);
                }, [account]);

                return (
                    <div
                        {...(!ready && {
                            'aria-hidden': true,
                            style: {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!connected) {
                                return (
                                    <StyledButton shape="rounded" onClick={openConnectModal}>
                                        Connect
                                    </StyledButton>
                                )
                            }

                            if (chain.unsupported) {
                                return (
                                    <StyledButton
                                        shape="rounded"
                                        colorStyle="redPrimary"
                                        onClick={openChainModal}
                                    >
                                        Wrong network
                                    </StyledButton>
                                )
                            }

                            return (
                                <div onClick={() => disconnect()}>
                                    <Profile
                                        address={account.address}
                                        ensName={account.ensName || undefined}
                                        avatar={account.ensAvatar || undefined}
                                        dropdownItems={[
                                            {
                                                label: 'Copy Address',
                                                color: 'text',
                                                onClick: () => copyToClipBoard(account.address),
                                            },
                                            {
                                                label: 'Disconnect',
                                                color: 'red',
                                                onClick: () => disconnect(),
                                            },
                                        ]}
                                    />
                                </div>
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButtonBase.Custom>
    )
}

const copyToClipBoard = async (text: string) => {
    try {
        await navigator.clipboard.writeText(text)
    } catch (err) {
        console.error('Failed to copy text: ', err)
    }
}
