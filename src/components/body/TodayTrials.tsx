import { HStack, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { readContract } from "thirdweb";

import {
  fungameContract,
  getGuessTrialsMethod,
  queryStartTime,
  Request,
} from "../../../types";
import { useAppContext } from "../../hooks/useAppContext";

const dayInSeconds = 86400;

export default function TodayTrials() {
  const { wallet, trials, onSetTrials } = useAppContext();
  const startTime = useRef<number>(0); //  START_TIME immutable in the contract (timestamp)

  useEffect(() => {
    if (!wallet) {
      onSetTrials(BigInt(0));
      return;
    }

    const fetchTrials = async () => {
      //  Note: these numbers are related to timestamp, thus it's safe using `Number`
      //  Calling Fungame contract to retrieve START_TIME
      //  get the current time, then (currentTime - START_TIME) / 86400 -> currentDay
      let currentDay: number = 0;
      const currentTime = Math.floor(Date.now() / 1000);
      if (startTime.current == 0)
        startTime.current = Number(await readContract(queryStartTime));

      //  `currentDay` is updated when `currentTime` > `startTime.current`
      //  If `startTime.current` = 0: currentDay = default = 0;
      //  If `startTime.current` >= `currentTime`: currentDay = default = 0;
      if (startTime.current != 0 && currentTime > startTime.current)
        currentDay = Math.round(
          (currentTime - startTime.current) / dayInSeconds
        );

      const queryGuessTrials: Request = {
        contract: fungameContract,
        method: getGuessTrialsMethod,
        params: [wallet.getAccount()?.address, currentDay],
      };
      const numOfTrials = BigInt(
        (await readContract(queryGuessTrials)).toString()
      );
      onSetTrials(numOfTrials);
    };

    fetchTrials();
    const intervalId = setInterval(fetchTrials, 10000);

    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <HStack>
      <Text fontSize={{ base: "xs" }}>Today guess trials:</Text>
      <Text fontSize={{ base: "md" }} color="#3498db">
        {trials.toString()}
      </Text>
    </HStack>
  );
}
