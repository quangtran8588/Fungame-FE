import {
  Box,
  Container,
  Divider,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";

import { methodClaim, pointsContract } from "../../../types";
import PointBalance from "../PointBalance";
import TransactionBtn from "../TransactionBtn";
import GuessTrials from "../GuessTrials";
import GameSection from "../game-section/GameSection";
import { useAppContext } from "../../hooks/useAppContext";

const btnStyles = {
  width: "70px",
  fontSize: "xs",
  color: "#809fff",
  background: "transparent",
  borderRadius: "10px",
  border: "2px solid #809fff",
};

export default function Content() {
  const { wallet } = useAppContext();
  return (
    <>
      <Box
        bgGradient="linear-gradient(to top, #1a1a1a, #2e3a46)"
        borderRadius="10px"
        border="1px solid #4d4d4d"
        color="#ffffff"
      >
        <HStack
          w="100%"
          h="100%"
          alignItems="baseline"
          justifyContent="space-between"
          my={2}
        >
          <Box ml={3}>
            <PointBalance />
          </Box>

          <Box mr={5}>
            <TransactionBtn
              btnName={"Claim"}
              request={{
                contract: pointsContract,
                method: methodClaim,
                params: [],
              }}
              isDisabled={wallet ? false : true}
              styles={btnStyles}
            />
          </Box>
        </HStack>
        <Divider my={1} width="95%" mx="2%" />
        <Box ml={3} mb={2}>
          <GuessTrials />
        </Box>
      </Box>

      <Container
        h="180px"
        bgGradient="linear-gradient(to top, #1a1a1a, #2e3a46)"
        borderRadius="10px"
        border="1px solid #4d4d4d"
        mt="30px"
        mb="20px"
      >
        <VStack>
          <Text mt={3} fontSize={{ base: "sm", sm: "md" }} color="#98FB98">
            Available Games
          </Text>
          <Box w="100%">
            <GameSection />
          </Box>
        </VStack>
      </Container>
    </>
  );
}
