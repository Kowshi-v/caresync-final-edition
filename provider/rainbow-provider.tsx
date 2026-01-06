"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { sonicTestnet } from "@/hooks/useChain";

const config = getDefaultConfig({
    appName: "Care Sync",
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    chains: [sonicTestnet],
    ssr: false,
});

const queryClient = new QueryClient();

export function RainbowKitProviderWrapper({ children }: { readonly children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="compact" initialChain={sonicTestnet}>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}