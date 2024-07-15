/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { readContract } from "thirdweb/transaction";
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

import { fungameContract, getWinningStatus, Request } from "../../types";
import { useAppContext } from "../hooks/useAppContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
}

const ChakraHappyEmotionIcon = chakra(RiEmotionHappyFill);
const ChakraUnhappyEmotionIcon = chakra(RiEmotionUnhappyFill);

export default function WinningStatusModal({ isOpen, onClose, gameId }: Props) {
  const [isWinning, setIsWinning] = useState<boolean>(false);
  const { wallet } = useAppContext();

  useEffect(() => {
    if (!wallet || gameId === 0) return;
    const checkWinning = async () => {
      const request: Request = {
        contract: fungameContract,
        method: getWinningStatus,
        params: [wallet?.getAccount()?.address, gameId],
      };

      const result = (await readContract(request)) as unknown as boolean;
      setIsWinning(result);
    };

    checkWinning();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
            <Text color={isWinning ? "#FFD700" : "#808080"}>
              {isWinning
                ? "Congratulations! You made a correct guess!"
                : "Sorry! Try again next time!"}
            </Text>

            <Box>
              {isWinning ? (
                <ChakraHappyEmotionIcon color="green" width="50px" />
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
