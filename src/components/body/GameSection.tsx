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

import SubmitModal from "../../modals/SubmitModal";
import TrialSubmissionForm from "../game-section/TrialSubmissionForm";
import GameItem from "../game-section/GameItem";
import {
  queryCurrentGameId,
  querySettings,
  queryStartTime,
} from "../../../types";
import { useAppContext } from "../../hooks/useAppContext";

export interface GameItemInfo {
  gameId: number;
  startTime: number;
  endTime: number;
  isActive: boolean;
}

interface GameInfo {
  gameId: number;
  startTime: number;
  gameSettings: number[];
}

export default function GameSection() {
  const [counter, setCounter] = useState<number>(0);
  const { wallet } = useAppContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gameInfo = useRef<GameInfo>({
    gameId: 0,
    startTime: 0,
    gameSettings: [0, 0, 0, 0],
  });
  counter;

  useEffect(() => {
    const fetchGame = async () => {
      const startTime = Number(await readContract(queryStartTime));
      const settings = (await readContract(querySettings)) as any[];
      const currentGameId = Number(await readContract(queryCurrentGameId));

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
    const currentGameId: number = gameInfo.current.gameId;
    const startTime: number = gameInfo.current.startTime;
    const windowTime: number = Number(gameInfo.current.gameSettings[2]);
    const lockoutTime: number = Number(gameInfo.current.gameSettings[3]);

    const gameStartTime: number =
      startTime + (currentGameId - 1 + idx) * windowTime;
    const gameEndTime: number = startTime + (currentGameId + idx) * windowTime;
    const isActive: boolean = currentTime <= gameEndTime - lockoutTime;

    const gameItem: GameItemInfo = {
      gameId: currentGameId + idx,
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

      <SubmitModal isOpen={isOpen} onClose={onClose}>
        <TrialSubmissionForm
          gameIds={gameItems.map((gameItem) => gameItem.gameId)}
          trialsPerDay={gameInfo.current.gameSettings[0]}
        />
      </SubmitModal>
    </Box>
  );
}
