"use client";

import React from "react";
import { HStack, Stack, Text} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import { useConnectModal, useAccountModal } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance, useEnsName,useDisconnect } from "wagmi";

const Navbar = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { isConnected, address } = useAccount();
   const { disconnect } = useDisconnect()

  const { data: balance } = useBalance({
    address,
    query: { enabled: !!address },
  });

  const { data: ensName } = useEnsName({
    address,
    query: { enabled: !!address },
  });

  return (
    <HStack w="full" pl={4} pr={4} pt="3" alignItems="center">
      <Link href="/">
        <Image src="/favicon.png" alt="Logo" width={40} height={40} />
      </Link>
      <Stack gap="0" mt="-1">
        <Text fontWeight="bold" fontSize="xl" color="black">
          Chain Elect
        </Text>
        <Text fontSize="sm" color="gray.700" mt="-1">
          Decentralized Voting
        </Text>
      </Stack>
      <HStack ml="auto" mt="-2" gap="20px">
        <RefreshCcw color="#4A5568" style={{cursor:"pointer"}} onClick={() => disconnect()}/>
        {!isConnected ? (
          <button
            onClick={openConnectModal}
            type="button"
            style={{
              color: "white",
              background: "linear-gradient(to right, #1e80f7, #bf65f7)",
              border: "none",
              borderRadius: "12px",
              padding: "8px 15px",
              cursor: "pointer",
            }}
          >
            Connect Wallet
          </button>
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
            {balance &&
              `${Number(balance.formatted).toFixed(3)} ${balance.symbol}`}
            &nbsp;|&nbsp;
            {ensName ?? `${address?.slice(0, 6)}...${address?.slice(-4)}`}
          </button>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
