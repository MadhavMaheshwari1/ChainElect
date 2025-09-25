"use client";

import React, { useEffect, useState } from "react";
import { HStack, Stack, Text, Button, Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useEnsName, useDisconnect } from "wagmi";
import VotingJSON from "../../chainelect/out/Voting.sol/Voting.json";
import { readContract } from "wagmi/actions";
import { Config } from "../config/Config";
import { sepolia } from "@wagmi/core/chains";
import { keyframes } from "@emotion/react";

const fadePulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

async function checkElection(): Promise<boolean | null> {
  const result = await readContract(Config, {
    abi: VotingJSON.abi,
    address: "0xceb6bb64c48e9c69ef3421e403a2ac334bfcb405",
    functionName: "isElectionActive",
    chainId: sepolia.id,
  });

  return typeof result === "boolean" ? result : false;
}

const Navbar = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address, query: { enabled: !!address } });
  const { data: ensName } = useEnsName({ address, query: { enabled: !!address } });

  const [isElectionActive, setIsElectionActive] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await checkElection();
        setIsElectionActive(result as boolean);
      } catch (err) {
        console.error("Error checking election:", err);
        setIsElectionActive(false);
      }
    })();
  }, []);

  return (
    <HStack
      w="full"
      pl={4}
      pr={4}
      pt="1"
      alignItems="center"
      height={["70px", "70px", "75px", "75px"]}
      bg="white"
      rounded="lg"
      boxShadow="0 14px 16px rgba(0,0,0,0.1)"
    >
      <Link href="/" style={{ marginTop: "-6px" }}>
        <Box w={["35px", "35px", "35px", "40px"]} h={["35px", "35px", "35px", "40px"]}>
          <Image src="/favicon.png" alt="Logo" width={40} height={40} style={{ objectFit: "contain" }} />
        </Box>
      </Link>

      <Stack gap="0" mt="-3">
        <Text fontWeight="bold" fontSize={[16, 20, 20, 24]} color="black">
          Chain Elect
        </Text>
        <Text color="gray.600" mt="-1" fontSize={[10, 12, 12, 14]}>
          Decentralized Voting
        </Text>
      </Stack>

      <HStack ml="auto" mt="-2" gap="20px">
        {isElectionActive !== null && (
          <Button
            bg={isElectionActive ? "green.200" : "red.200"}
            color={isElectionActive ? "green.200" : "red.200"}
            fontWeight="bold"
            borderRadius="30px"
            p="0"
            h={[6, 6, 7, 7]}
            w={[19, 20, 20, 20]}
            display={["none", "none", "inline-flex", "inline-flex"]}
          >
            <Box
              w={2}
              h={2}
              rounded="full"
              bg={isElectionActive ? "green.600" : "red.600"}
              animation={`${fadePulse} 1.5s ease-in-out infinite`}
            />
            {isElectionActive ? (
              <Text color="green.600" fontSize={[8, 10, 12, 13]}>
                Open
              </Text>
            ) : (
              <Text color="red.600" fontSize={[8, 10, 12, 13]}>
                Closed
              </Text>
            )}
          </Button>
        )}

        <Box cursor="pointer" w={[3, 4, 4, 5]} h={[3, 4, 4, 5]} onClick={() => disconnect()}>
          <RefreshCcw color="#4A5568" size="100%" />
        </Box>

        {!isConnected ? (
          <Button
            onClick={openConnectModal}
            type="button"
            style={{
              color: "white",
              background: "linear-gradient(to right, #1e80f7, #bf65f7)",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
            }}
            px={[2, 4, 6, 6]}
            py={[1, 1, 2, 3]}
            fontSize={[9, 10, 14, 14]}
            h={[7, 8, 8, 10]}
          >
            Connect Wallet
          </Button>
        ) : (
          <button
            onClick={openAccountModal}
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "white",
              background: "linear-gradient(to right, #4a98f8, #bf65f7)",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            {balance && `${Number(balance.formatted).toFixed(3)} ${balance.symbol}`} &nbsp;|&nbsp;
            {ensName ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`}
          </button>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
