import { Stack, Box, HStack, Text } from "@chakra-ui/react";
import { Activity } from "lucide-react";
import { keyframes } from "@emotion/react";

const fadePulse = keyframes`
0% { opacity: 1; }
50% { opacity: 0.3; }
100% { opacity: 1; }
`;

const LiveStats = () => {
  return (
    <Stack
      w="100%"
      bg="white"
      boxShadow="0 14px 16px rgba(0,0,0,0.1)"
      rounded="lg"
    >
      <Stack>
        <HStack p="4">
          <HStack justifyContent="space-between" width="full">
            <HStack>
              <Box bg="#d0e1f7ff" p={2} rounded="lg">
                <Activity color="#3b528dff" />
              </Box>
              <Stack gap="0px">
                <Text color="black" fontWeight="bold">
                  Live Election Data
                </Text>
                <Text color="black">
                  Real-time voting statistics and participation
                </Text>
              </Stack>
            </HStack>
            <Box color="green.600" display="flex" fontWeight="semibold" py={2} px={3} alignItems="center" gap={2} bg="#ecfcecff" rounded="lg">
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
      </Stack>
    </Stack>
  );
};

export default LiveStats;
