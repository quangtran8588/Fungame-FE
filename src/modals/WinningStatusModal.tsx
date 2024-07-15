/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  chakra,
  Box,
  VStack,
} from "@chakra-ui/react";
import { RiEmotionHappyFill, RiEmotionUnhappyFill } from "react-icons/ri";

interface Props {
  isOpen: boolean;
  isWinning: boolean;
  onClose: () => void;
  clearWinning: () => void;
}

const ChakraHappyEmotionIcon = chakra(RiEmotionHappyFill);
const ChakraUnhappyEmotionIcon = chakra(RiEmotionUnhappyFill);

export default function WinningStatusModal({
  isOpen,
  isWinning,
  onClose,
  clearWinning,
}: Props) {
  const handleOnClose = () => {
    clearWinning();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleOnClose}
      colorScheme="blackAlpha"
      isCentered={true}
      size={{ base: "xs", md: "sm", xl: "md" }}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#000" fontSize={{ base: "sm" }}>
          <Center>Fun Game</Center>
        </ModalHeader>
        <ModalCloseButton size={{ base: "sm" }} color="gray.500" />
        <ModalBody color="gray.700">
          <VStack justifyContent="center" gap={5}>
            <Text color={isWinning ? "#ff8c00" : "#9370DB"}>
              {isWinning
                ? "Congratulations! You're a winner!"
                : "Sorry! You're not a winner!"}
            </Text>

            <Box>
              {isWinning ? (
                <ChakraHappyEmotionIcon color="#32CD32 " size="50px" />
              ) : (
                <ChakraUnhappyEmotionIcon color="#9370DB" size="45px" />
              )}
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
