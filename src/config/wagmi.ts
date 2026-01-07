import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "viem/chains";

export const config = getDefaultConfig({
  appName: "NFT Minting Studio",
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || "nft-studio",
  chains: [mainnet],
  ssr: false,
  
});
