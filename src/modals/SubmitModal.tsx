/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function SubmitModal({ isOpen, onClose, children }: Props) {
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
        <ModalBody color="gray.700">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
