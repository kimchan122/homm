import { Button, Profile, mq } from '@ensdomains/thorin';
import { ConnectButton as ConnectButtonBase } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import styled, { css } from 'styled-components';
import { getUser } from '../contracts/hommContract';

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

    const handleConnectButtonClick = async (address) => {
        const result = await getUser(address);
        console.log('getUser result:', result);
    };

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

                            if (connected) {
                                handleConnectButtonClick(account.address);
                            }

                            return (
                                <Profile
                                    address={account.address}
                                    ensName={account.ensName || undefined}
                                    avatar={account.ensAvatar || undefined}
                                    onClick={openAccountModal}
                                    dropdownItems={[
                                        {
                                            label: 'Disconnect',
                                            color: 'red',
                                            onClick: () => disconnect(),
                                        }
                                    ]}
                                />
                            )
                        })()}
                    </div>
                )
            }}
        </ConnectButtonBase.Custom>
    )
}