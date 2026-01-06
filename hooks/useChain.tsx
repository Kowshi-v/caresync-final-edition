import { defineChain } from "viem";

export const sonicTestnet = defineChain({
    id: 14601,
    name: "Sonic Testnet",
    iconUrl: "https://testnet.sonicscan.org/assets/sonic/images/svg/logos/chain-light.svg?v=26.1.1.2",
    nativeCurrency: {
        name: "Sonic",
        symbol: "S",
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.testnet.soniclabs.com"],
        },
    },
    blockExplorers: {
        default: {
            name: "Sonic Explorer",
            url: "https://testnet.soniclabs.com",
        },
    },
});
