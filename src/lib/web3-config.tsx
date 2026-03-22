// Web3 provider — currently a safe passthrough.
// Will be re-enabled once wagmi/@web3modal packages are confirmed installed.
import React, { ReactNode } from 'react';

// 1. Get projectId from https://cloud.walletconnect.com
// You can keep a default string for local hacking without errors, 
// but it's required for production via WalletConnect Cloud.
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '1234567890abcdef1234567890abcdef'; // placeholder

export function Web3ConfigProvider({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
