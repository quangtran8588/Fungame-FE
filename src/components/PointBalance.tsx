import { useState, useEffect } from "react";
import { HStack, Text } from "@chakra-ui/react";
import { readContract } from "thirdweb";
import { isEqual } from "lodash";

import { getPointsMethod, pointsContract, Request } from "../../types";
import { useAppContext } from "../hooks/useAppContext";

export default function PointBalance() {
  const { wallet } = useAppContext();
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    if (!wallet) {
      setPoints(0);
      return;
    }

    const fetchPoints = async () => {
      const request: Request = {
        contract: pointsContract,
        method: getPointsMethod,
        params: [wallet.getAccount()?.address],
      };

      const result = Number(await readContract(request));
      setPoints(result);
    };

    fetchPoints();
    const intervalId = setInterval(fetchPoints, 10000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet]);

  return (
    <HStack w="100%" h="100%" alignItems="baseline" justifyContent="flex-start">
      <Text fontSize={{ base: "xs" }}>Current Points:</Text>
      <Text fontSize={{ base: "md" }} color="#3498db">
        {points !== null ? `${points.toString()}` : 0}
      </Text>
    </HStack>
  );
}
