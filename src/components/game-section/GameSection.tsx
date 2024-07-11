/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { readContract } from "thirdweb";
import { Box, Grid, GridItem } from "@chakra-ui/react";

import GameItem from "./GameItem";
import {
  queryCurrentGameId,
  querySettings,
  queryStartTime,
} from "../../../types";
import { useAppContext } from "../../hooks/useAppContext";
import { isEqual } from "lodash";

export interface GameItemInfo {
  gameId: number;
  startTime: number;
  endTime: number;
  isActive: boolean;
  isConnectedWallet: boolean;
}

interface GameInfo {
  gameId: number;
  startTime: number;
  gameSettings: number[];
}

export default function GameSection() {
  const { wallet } = useAppContext();
  const [counter, setCounter] = useState<number>(0);
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
  const gameItem1: GameItemInfo = {
    gameId: gameInfo.current.gameId,
    startTime:
      gameInfo.current.startTime +
      (gameInfo.current.gameId - 1) * Number(gameInfo.current.gameSettings[2]),
    endTime:
      gameInfo.current.startTime +
      gameInfo.current.gameId * Number(gameInfo.current.gameSettings[2]),
    isActive:
      currentTime <=
      gameInfo.current.startTime +
        gameInfo.current.gameId * Number(gameInfo.current.gameSettings[2]) -
        Number(gameInfo.current.gameSettings[3]),
    isConnectedWallet: wallet ? true : false,
  };

  const gameItem2: GameItemInfo = {
    gameId: gameInfo.current.gameId + 1,
    startTime:
      gameInfo.current.startTime +
      gameInfo.current.gameId * Number(gameInfo.current.gameSettings[2]),
    endTime:
      gameInfo.current.startTime +
      (gameInfo.current.gameId + 1) * Number(gameInfo.current.gameSettings[2]),
    isActive:
      currentTime <=
      gameInfo.current.startTime +
        (gameInfo.current.gameId + 1) *
          Number(gameInfo.current.gameSettings[2]) -
        Number(gameInfo.current.gameSettings[3]),
    isConnectedWallet: wallet ? true : false,
  };

  return (
    <Box>
      <Grid templateRows="repeat(2, 1fr)" gap={3}>
        <GridItem w="100%" h="10">
          <GameItem info={gameItem1} />
        </GridItem>
        <GridItem w="100%" h="10">
          <GameItem info={gameItem2} />
        </GridItem>
      </Grid>
    </Box>
  );
}
