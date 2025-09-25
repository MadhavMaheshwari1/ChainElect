"use client";

import React from "react";
import Navbar from "../components/Navbar";
import { Box, Stack, Text} from "@chakra-ui/react";
import { CustomAvatar } from "../components/CustomAvatar";
import Link from "next/link";
import { Play } from "lucide-react";
import Image from "next/image";
import { Eye } from "lucide-react";
import LiveStats from "../components/LiveStats"

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const _projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if(!_projectId)throw new Error("Project Id is not present");

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: _projectId,
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const page = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode avatar={CustomAvatar}>
          <Box
            maxW="1600px"
            m="auto"
            bg="white"
            height="100vh"
            background="#e7edf5ff"
            px={6}
            py={4}
          >
            <Navbar />
            <Stack justifyContent="center" w="100%" mt={20} alignItems="center" mb={8}>
              <Link href="/">
                <Image src="/favicon.png" alt="Logo" width={60} height={60} />
              </Link>
              <Text fontSize={[36, 40, 44, 48]} color="black" fontWeight="bold" textAlign="center" wordBreak="break-word">
                The Future of{" "}
                <Text
                  fontSize={[36, 40, 44, 48]}
                  as="span"
                  style={{
                    background: "linear-gradient(to right, #1e80f7, #bf65f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                  }}
                >
                  Democratic Voting
                </Text>
              </Text>
              <Text maxW="600px" wordBreak="break-word" color="gray.600" textAlign="center">
                Experience transparent, secure, and decentralized voting powered
                by blockchain technology. Every vote counts, every voice
                matters, and every result is verfiable.
              </Text>
              <Stack gap="10px" marginTop={3} direction={["column","row","row","row"]} alignItems="center" justifyContent="center">
                <Link
                  href="/dashboard"
                  style={{
                    background: "linear-gradient(to right, #1e80f7, #bf65f7)",
                    borderRadius: "12px",
                    cursor: "pointer",
                    paddingInline: "10px",
                    paddingBlock: "11px",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to right, #0056b3, #9932cc)";
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.marginTop = "2px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to right, #1e80f7, #bf65f7)";
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.marginTop = "0px";
                  }}
                >
                  <Box style={{ transform: "scale(0.95)" }} display="flex" gap="8px" fontSize={[12,14,16,16]} h={[6,7,7,7]} w={150} alignItems="center" justifyContent="center">
                    <Play size={16} style={{ marginTop: "3px" }} /> Go to Dashboard
                  </Box>
                </Link>
                <Link
                  href="/"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "transparent",
                    borderRadius: "12px",
                    cursor: "pointer",
                    paddingInline: "20px",
                    paddingBlock: "10px",
                    border: "2px solid #c1c1c1ff",
                    color: "black",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Box style={{ transform: "scale(0.95)" }} display="flex" gap="8px" h={[6,7,7,7]} w={120} alignItems="center" justifyContent="center">
                    <Eye size={16} style={{ marginTop: "3px" }} /> View Results
                  </Box>
                </Link>
              </Stack>
            </Stack>
            <LiveStats/>
          </Box>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default page;
