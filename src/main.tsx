import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "./config/wagmi";
import App from "./App";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider>
          <Toaster richColors closeButton/>
          <App />
          
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  </StrictMode>
);
