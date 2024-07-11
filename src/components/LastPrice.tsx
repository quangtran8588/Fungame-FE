import { HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { readContract } from "thirdweb";
import { ethers } from "ethers";

import {
  fungameContract,
  getGameResult,
  queryCurrentGameId,
  Request,
} from "../../types";

export default function LastPrice() {
  const [lastPrice, setLastPrice] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const fetchData = async () => {
      const currentGameId = BigInt(
        Number(await readContract(queryCurrentGameId))
      );
      const queryGameResult: Request = {
        contract: fungameContract,
        method: getGameResult,
        params: [currentGameId - BigInt(1)],
      };
      const result = await readContract(queryGameResult);
      setLastPrice(result[1] as bigint);
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <HStack
      w="100%"
      h="40px"
      alignItems="baseline"
      justifyContent="flex-end"
      mr={7}
    >
      <Text fontSize={{ base: "2xs", sm: "xs" }} color="white">
        Last Price:
      </Text>
      <Text fontSize={{ base: "xs", sm: "md" }} color="#3498db">
        {`${ethers.formatUnits(lastPrice, 2)}`}
      </Text>
    </HStack>
  );
}
