import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mainnet, avalancheFuji } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Even if you're app doesn't use mainnet ETH, you still need it in this array for ENS
export const chains = [mainnet, avalancheFuji];

const { publicClient } = configureChains(chains, [publicProvider()]);

const { connectors } = getDefaultWallets({
    // Get your own WalletConnect ID: https://cloud.walletconnect.com/sign-in
    projectId: 'fdedb5010bd380ceb41a23c05242de06',
    appName: 'HOMM',
    chains,
});

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
});