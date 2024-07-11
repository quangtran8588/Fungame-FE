/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import TransactionBtn from "../components/TransactionBtn";
import { fungameContract } from "../../types";

interface Props {
  gameId: number;
  isDisabled: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const btnUpStyles = {
  width: "70px",
  fontSize: "xs",
  color: "#fff",
  background: "#27ae60",
  borderRadius: "5px",
  border: "2px solid #2ecc71",
};

const btnDownStyles = {
  width: "70px",
  fontSize: "xs",
  color: "#fff",
  background: "#e74c3c",
  borderRadius: "5px",
  border: "2px solid #e57373",
};

export default function GuessModal({
  gameId,
  isOpen,
  onClose,
  isDisabled,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      colorScheme="blackAlpha"
      isCentered={true}
      size={{ base: "xs", md: "sm", xl: "md" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="#000" fontSize="sm">
          <Center>{`Game Number: ${gameId}`}</Center>
        </ModalHeader>
        <ModalCloseButton size="sm" color="gray.500" />
        <ModalBody>
          <Center fontSize="md" color="gray.700" mb={5}>
            What's your guess?
          </Center>
          <HStack h="100%" justifyContent="center" gap={3} mt={5}>
            <TransactionBtn
              btnName="UP"
              request={{
                contract: fungameContract,
                method: "",
                params: [],
              }}
              styles={btnUpStyles}
              isDisabled={isDisabled}
            />

            <TransactionBtn
              btnName="DOWN"
              request={{
                contract: fungameContract,
                method: "",
                params: [],
              }}
              styles={btnDownStyles}
              isDisabled={isDisabled}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
