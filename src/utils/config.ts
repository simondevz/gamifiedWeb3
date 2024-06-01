import { createConfig, http } from "@wagmi/core";
import { sepolia } from "viem/chains";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

// 1. Your WalletConnect Cloud project ID
const projectId = process.env.WEB3MODAL_PROJECTID as string;

// 2. Create wagmiConfig
const metadata = {
  name: "Learn3Play",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [sepolia] as const;
const mainConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http("https://sepolia.example.com"),
  },
});

export default mainConfig;
