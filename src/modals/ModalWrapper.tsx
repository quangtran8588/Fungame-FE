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
  header: {
    title: string;
    color: string;
    fontSize: any;
  };
  closeBtn: {
    size: any;
    color: string;
  };
  children: React.ReactNode;
}

export default function ModalWrapper({
  isOpen,
  onClose,
  header,
  children,
}: Props) {
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
        <ModalHeader color="#000" fontSize={{ base: "xs", md: "sm" }}>
          <Center>{header.title}</Center>
        </ModalHeader>
        <ModalCloseButton size="sm" color="gray.500" />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
