"use client";

import React, { useState, useEffect } from "react";
import {
  Stack,
  Box,
  HStack,
  Text,
  SimpleGrid,
  Flex,
  Progress,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import {
  Activity,
  Users,
  TrendingUp,
  Crown,
  Award,
  Vote,
  CircleCheckBig,
  Clock,
} from "lucide-react";
import { readContract } from "wagmi/actions";
import { Config } from "../config/Config";
import VotingJSON from "@/Contracts/Voting.json";
import { sepolia } from "@wagmi/core/chains";

const LiveStats = () => {
  const fadePulse = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
  `;

  async function cntTotal(funName: string): Promise<number> {
    const result = await readContract(Config, {
      abi: VotingJSON.abi,
      address: "0xceb6bb64c48e9c69ef3421e403a2ac334bfcb405",
      functionName: `${funName}`,
      chainId: sepolia.id,
    });

    return typeof result === "number" ? result : 0;
  }

  async function isElectionActiveCurrently(): Promise<boolean> {
    const result = await readContract(Config, {
      abi: VotingJSON.abi,
      address: "0xceb6bb64c48e9c69ef3421e403a2ac334bfcb405",
      functionName: "isElectionActive",
      chainId: sepolia.id,
    });

    return typeof result === "boolean" ? result : false;
  }

  async function electionStartOrEndTime(funNameForElectionStartOrEnd:string): Promise<number> {
    const result = await readContract(Config, {
      abi: VotingJSON.abi,
      address: "0xceb6bb64c48e9c69ef3421e403a2ac334bfcb405",
      functionName: `${funNameForElectionStartOrEnd}`,
      chainId: sepolia.id,
    });

    return typeof result === "number" ? result : 0;
  }

  const[electionStart,setElectionStart] = useState<number>(0);
  const[electionEnd,setElectionEnd] = useState<number>(0);
  const[isElectionActive,setElectionActive] = useState<boolean>(false);

  const [stats, setStats] = useState([
    {
      id: 1,
      color: "#3b528dff",
      icon1: Users,
      icon2: TrendingUp,
      description: "Registered Voters",
      count: 0,
    },
    {
      id: 2,
      color: "#9333ea",
      icon1: Crown,
      icon2: Award,
      description: "Active Candidates",
      count: 0,
    },
    {
      id: 3,
      color: "#16a34a",
      icon1: Vote,
      icon2: CircleCheckBig,
      description: "Votes Cast",
      count: 0,
    },
    {
      id: 4,
      color: "#f59e0b",
      icon1: TrendingUp,
      icon2: Clock,
      description: "Participation Rate",
      count: 0,
    },
  ]);

  useEffect(() => {
    (async () => {
      const isElectionGoingOn = await isElectionActiveCurrently();
      if(isElectionGoingOn){
        const startTime = await electionStartOrEndTime("electionStart");
        const endTime = await electionStartOrEndTime("electionEnd");
        setElectionStart(startTime);
        setElectionEnd(endTime);
      }
      setElectionActive(isElectionGoingOn);
      const registeredVoters = await cntTotal("totalRegisteredVoters");
      const totalRegisteredCandidates = await cntTotal(
        "totalRegisteredCandidates",
      );
      const totalVotersWhoVoted = await cntTotal("totalVotersWhoVoted");
      const currStats = [
        {
          id: 1,
          color: "#3b528dff",
          icon1: Users,
          icon2: TrendingUp,
          description: "Registered Voters",
          count: registeredVoters,
        },
        {
          id: 2,
          color: "#9333ea",
          icon1: Crown,
          icon2: Award,
          description: "Active Candidates",
          count: totalRegisteredCandidates,
        },
        {
          id: 3,
          color: "#16a34a",
          icon1: Vote,
          icon2: CircleCheckBig,
          description: "Votes Cast",
          count: totalVotersWhoVoted,
        },
        {
          id: 4,
          color: "#f59e0b",
          icon1: TrendingUp,
          icon2: Clock,
          description: "Participation Rate",
          count: totalVotersWhoVoted / (registeredVoters===0?1:registeredVoters),
        },
      ];
      setStats(currStats);
    })();
  }, []);

  return (
    <Stack
      w="100%"
      bg="white"
      boxShadow="0 14px 16px rgba(0,0,0,0.1)"
      rounded="lg"
      p="4"
    >
      <Stack>
        <HStack>
          <HStack justifyContent="space-between" width="full">
            <HStack>
              <Box bg="#d0e1f7ff" p={2} rounded="lg">
                <Activity color="#3b528dff" />
              </Box>
              <Stack gap="0">
                <Text color="black" fontWeight="bold">
                  Live Election Data
                </Text>
                <Text color="black">
                  Real-time voting statistics and participation
                </Text>
              </Stack>
            </HStack>

            <Box
              color="green.600"
              display="flex"
              fontWeight="semibold"
              py={2}
              px={3}
              alignItems="center"
              gap={2}
              bg="#ecfcecff"
              rounded="lg"
            >
              <Box
                w={2}
                h={2}
                rounded="full"
                bg="green.600"
                animation={`${fadePulse} 1.5s ease-in-out infinite`}
              />
              Live Updates
            </Box>
          </HStack>
        </HStack>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6} py="4">
          {stats.map((stat) => {
            const Icon1 = stat.icon1;
            const Icon2 = stat.icon2;

            return (
              <Box
                key={stat.id}
                borderRadius="xl"
                cursor="pointer"
                p={6}
                boxShadow="md"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                style={{
                  background: `conic-gradient(from 0deg at 0% 0%, white 20%, ${stat.color})`,
                }}
              >
                <Flex justify="space-between" align="center" mb={3}>
                  <Box position="relative">
                    <Box
                      bg="black"
                      opacity={0.1}
                      position="absolute"
                      width="100%"
                      height="100%"
                      rounded="lg"
                      py={5}
                      px={5}
                      left="-30%"
                      top="-20%"
                    />
                    <Icon1 color={stat.color} />
                  </Box>
                  <Box position="relative">
                    <Box
                      bg="black"
                      opacity={0.1}
                      position="absolute"
                      width="100%"
                      height="100%"
                      rounded="lg"
                      py={5}
                      px={5}
                      left="-30%"
                      top="-20%"
                    />
                    <Icon2 color={stat.color} />
                  </Box>
                </Flex>

                <Text fontSize="2xl" fontWeight="bold" color={stat.color}>
                  {stat.description === "Participation Rate"
                    ? `${stat.count}%`
                    : stat.count}
                </Text>
                <Text
                  fontSize="lg"
                  fontWeight="medium"
                  mb={1}
                  color={stat.color}
                >
                  {stat.description}
                </Text>
              </Box>
            );
          })}
        </SimpleGrid>
        <Box minW="100%" py={4} px={8} rounded="lg" bg="#e7edf5ff" display={isElectionActive?"block":"none"}>
          <HStack pb="4" justifyContent="space-between">
            <Text color="black" fontWeight="bold">Election Progress</Text>
            <Text color="#7d7c7cff" fontWeight="semibold">Time Remaining</Text>
          </HStack>
          {electionStart+electionEnd}
          <Progress.Root>
            <Progress.Track
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            >
              <Progress.Range
                style={{ backgroundColor: "#48bb78", borderRadius: "8px" }}
              />
            </Progress.Track>
            <Progress.Label />
            <Progress.ValueText />
          </Progress.Root>
        </Box>
      </Stack>
    </Stack>
  );
};

export default LiveStats;
