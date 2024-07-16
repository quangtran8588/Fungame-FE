/* eslint-disable @typescript-eslint/no-explicit-any */
import { HStack, Text } from "@chakra-ui/react";

import { GameItemInfo } from "../body/GameSection";

interface Props {
  info: GameItemInfo;
}

export default function GameItem({ info }: Props) {
  const startTime = new Date(Number(info.startTime) * 1000);
  const startHours = startTime.getHours().toString().padStart(2, "0");
  const startMinutes = startTime.getMinutes().toString().padStart(2, "0");

  const endTime = new Date(Number(info.endTime) * 1000);
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
      >
        <HStack ml="3" fontSize={{ base: "xs", sm: "sm" }}>
          <Text color="#fff">Game Id: </Text>
          <Text color="#FFFF00">{info.gameId.toString()}</Text>
        </HStack>
        <Text
          mr="3"
          fontSize={{ base: "xs", sm: "sm" }}
          color={info.isActive ? "#9ACD32" : "#ff0000"}
        >
          {`${startHours}:${startMinutes} - ${endHours}:${endMinutes}`}
        </Text>
      </HStack>
    </>
  );
}
