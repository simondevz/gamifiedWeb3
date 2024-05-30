import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router.ts";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

// Web 3 modal and wagmi setup
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

// 1. Your WalletConnect Cloud project ID
const projectId = process.env.WEB3MODAL_PROJECTID as string;

// 2. Create wagmiConfig
const metadata = {
  name: "Learn3Play",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

//  TODO Remove strick mode before deployment
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </WagmiProvider>
  </React.StrictMode>
);
