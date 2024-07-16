import { chakra, useDisclosure, VStack } from "@chakra-ui/react";
import { BsInfoCircleFill } from "react-icons/bs";

import MarketPrice from "../header/MarketPrice";
import LastPrice from "../header/LastPrice";
import ModalWrapper from "../../modals/ModalWrapper";
import GameInfo from "../modal-content/GameInfo";

const ChakraInfoIcon = chakra(BsInfoCircleFill, {
  baseStyle: {
    cursor: "pointer",
    transition: "all 0.2s",
    _hover: { transform: "scale(1.2)" },
    _active: { transform: "scale(1)" },
    _focus: { boxShadow: "outline" },
  },
});

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack mt="30px" mb="10px" gap={3} position="relative">
      <ChakraInfoIcon
        position="absolute"
        top="-3"
        right="3"
        role="button"
        aria-label="Info"
        onClick={onOpen}
      />

      <MarketPrice />
      <LastPrice />
      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        header={{
          title: "Fun Game",
          color: "#fff",
          fontSize: { base: "sm", md: "md" },
        }}
        closeBtn={{
          size: { base: "sm" },
          color: "gray.300",
        }}
      >
        <GameInfo />
      </ModalWrapper>
    </VStack>
  );
}
