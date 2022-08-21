import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  chain,
  configureChains,
  createClient,
  useProvider,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import Main from "./view/Main";

// Connect to Ethereum via wagmi
const { chains, provider } = configureChains(
  [chain.ropsten],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({ appName: "Hello Foundry", chains });
const wagmiClient = createClient({ autoConnect: true, connectors, provider });

const root = document.querySelector("#root")!;
createRoot(root).render(<App />);

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Main />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
