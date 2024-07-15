import {
  Box,
  Container,
  Divider,
  HStack,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import Points from "../body/Points";
import TodayTrials from "../body/TodayTrials";
import GameSection from "../body/GameSection";
import SubmitModal from "../../modals/SubmitModal";
import ClaimSubmissionForm from "../body/ClaimSubmissionForm";
import { useAppContext } from "../../hooks/useAppContext";

export default function Body() {
  const { wallet } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Points />
          </Box>

          <Button
            width={{ base: "60px" }}
            height={{ base: "30px" }}
            fontSize={{ base: "xs" }}
            mr={3}
            background="#809fff"
            color="#000"
            onClick={onOpen}
            isDisabled={!wallet ? true : false}
          >
            Claim
          </Button>
          <SubmitModal isOpen={isOpen} onClose={onClose}>
            <ClaimSubmissionForm />
          </SubmitModal>
        </HStack>

        <Divider my={1} width="95%" mx="2%" />

        <Box ml={3} mb={2}>
          <TodayTrials />
        </Box>
      </Box>

      <Container
        h="300px"
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
