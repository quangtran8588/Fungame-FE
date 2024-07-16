/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { readContract } from "thirdweb";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { isEqual } from "lodash";

import TrialSubmissionForm from "../modal-content/TrialSubmissionForm";
import ModalWrapper from "../../modals/ModalWrapper";
import GameItem from "../game-section/GameItem";
import {
  queryCurrentGameId,
  querySettings,
  queryStartTime,
} from "../../../types";
import { useAppContext } from "../../hooks/useAppContext";

export interface GameItemInfo {
  gameId: bigint;
  startTime: bigint;
  endTime: bigint;
  isActive: boolean;
}

interface GameInfo {
  gameId: bigint;
  startTime: bigint;
  gameSettings: bigint[];
}

export default function GameSection() {
  const [counter, setCounter] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallet } = useAppContext();
  const gameInfo = useRef<GameInfo>({
    gameId: BigInt(0),
    startTime: BigInt(0),
    gameSettings: [BigInt(0), BigInt(0), BigInt(0), BigInt(0)],
  });
  counter;

  useEffect(() => {
    const fetchGame = async () => {
      const startTime = BigInt((await readContract(queryStartTime)).toString());
      const settings = (await readContract(querySettings)) as any[];
      const currentGameId = BigInt(
        (await readContract(queryCurrentGameId)).toString()
      );

      const newInfo: GameInfo = {
        gameId: currentGameId,
        startTime: startTime,
        gameSettings: settings,
      };
      if (!isEqual(gameInfo.current, newInfo)) {
        gameInfo.current = newInfo;
        setCounter(0); //  reset counter
        return;
      }
      setCounter((current) => current + 1);
    };

    fetchGame();
    const intervalId = setInterval(fetchGame, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const currentTime = Math.floor(Date.now() / 1000);
  const gameItems = [...Array(3).keys()].map((idx) => {
    const currentGameId: bigint = gameInfo.current.gameId;
    const startTime: bigint = gameInfo.current.startTime;
    const windowTime: bigint = gameInfo.current.gameSettings[2];
    const lockoutTime: bigint = gameInfo.current.gameSettings[3];

    const gameStartTime: bigint =
      startTime + (currentGameId - BigInt(1) + BigInt(idx)) * windowTime;
    const gameEndTime: bigint =
      startTime + (currentGameId + BigInt(idx)) * windowTime;
    const isActive: boolean = currentTime <= gameEndTime - lockoutTime;

    const gameItem: GameItemInfo = {
      gameId: currentGameId + BigInt(idx),
      startTime: gameStartTime,
      endTime: gameEndTime,
      isActive: isActive,
    };
    return gameItem;
  });

  return (
    <Box>
      <Grid templateRows={`repeat(${gameItems.length}, 1fr)`} gap={2} mb={5}>
        {gameItems.map((gameItem) => (
          <GridItem w="100%" h="10" key={gameItem.gameId}>
            <GameItem info={gameItem} />
          </GridItem>
        ))}
      </Grid>

      <Center>
        <Button
          width={{ base: "100px" }}
          height={{ base: "35px" }}
          fontSize={{ base: "xs" }}
          background="#809fff"
          color="#000"
          onClick={onOpen}
          isDisabled={!wallet ? true : false}
        >
          Submit Trial
        </Button>
      </Center>

      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        header={{
          title: "Fun Game",
          color: "#000",
          fontSize: { base: "sm" },
        }}
        closeBtn={{
          size: { base: "sm" },
          color: "gray.500",
        }}
      >
        <TrialSubmissionForm
          gameIds={gameItems
            .filter((gameItem) => gameItem.isActive)
            .map((gameItem) => gameItem.gameId)}
          trialsPerDay={gameInfo.current.gameSettings[0]}
        />
      </ModalWrapper>
    </Box>
  );
}
