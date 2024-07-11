/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Text, useDisclosure } from "@chakra-ui/react";

import GuessModal from "../../modals/GuessModal";
import { GameItemInfo } from "./GameSection";

interface Props {
  info: GameItemInfo;
}

export default function GameItem({ info }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const startTime = new Date(info.startTime * 1000);
  const startHours = startTime.getHours().toString().padStart(2, "0");
  const startMinutes = startTime.getMinutes().toString().padStart(2, "0");

  const endTime = new Date(info.endTime * 1000);
  const endHours = endTime.getHours().toString().padStart(2, "0");
  const endMinutes = endTime.getMinutes().toString().padStart(2, "0");

  return (
    <>
      <HStack
        w="100%"
        h="100%"
        borderRadius="10px"
        border="3px"
        borderColor={info.isActive ? "#809fff" : "gray.600"}
        borderStyle="double"
        alignItems="center"
        justifyContent="space-between"
        onClick={onOpen}
      >
        <HStack ml="3" fontSize={{ base: "xs", sm: "sm" }}>
          <Text color="#fff">Game Id: </Text>
          <Text color="#FFFF00">{info.gameId}</Text>
        </HStack>
        <Text
          mr="3"
          fontSize={{ base: "xs", sm: "sm" }}
          color={info.isActive ? "#9ACD32" : "#ff0000"}
        >
          {`${startHours}:${startMinutes} - ${endHours}:${endMinutes}`}
        </Text>
      </HStack>
      <GuessModal
        isOpen={isOpen}
        onClose={onClose}
        gameId={info.gameId}
        isDisabled={info.isActive && info.isConnectedWallet ? false : true}
      />
    </>
  );
}
