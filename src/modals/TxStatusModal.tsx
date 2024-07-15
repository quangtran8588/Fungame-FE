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
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  reset: () => void;
  action: string;
  Icon: JSX.Element;
  txHash?: string;
  errorString?: string;
}

const errorMsg = "Something went wrong";
const confirmedMsg = "Transaction completed";
const pendingMsg = "Waiting for confirmation";

export default function TxStatusModal({
  isOpen,
  onClose,
  reset,
  action,
  Icon,
  txHash,
  errorString,
}: Props) {
  const title =
    action === "pending"
      ? pendingMsg
      : action === "confirmed"
      ? confirmedMsg
      : errorMsg;

  const handleOnClose = () => {
    reset();
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
        <ModalHeader color="#000" fontSize={{ base: "xs", md: "sm" }}>
          <Center>{title}</Center>
        </ModalHeader>
        <ModalCloseButton size="sm" color="gray.500" />
        <ModalBody>
          <Center flexDirection="column" gap={5}>
            {Icon}
            {txHash && (
              <Link
                color="gray.700"
                fontSize={{ base: "xs", md: "sm" }}
                href={`${import.meta.env.VITE_NETWORK_EXPLORER}${txHash}`}
                isExternal
              >
                View Transaction <ExternalLinkIcon mx="2px" />
              </Link>
            )}
            {errorString && (
              <Text color="red.500" fontSize={{ base: "xs", md: "sm" }}>
                {errorString}
              </Text>
            )}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
