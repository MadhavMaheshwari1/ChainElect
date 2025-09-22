"use client";

import React from 'react'
import Navbar from "../components/Navbar"
import { Box } from "@chakra-ui/react"
import {CustomAvatar} from "../components/CustomAvatar"

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const page = () => {
  return (
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode avatar={CustomAvatar}>
            <Box maxW="1500px" m="auto" bg="white" height="100vh">
              <Navbar/>
            </Box>
          </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
  )
}

export default page