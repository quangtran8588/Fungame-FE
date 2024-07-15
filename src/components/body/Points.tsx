import { useEffect } from "react";
import { readContract } from "thirdweb";
import { HStack, Text } from "@chakra-ui/react";

import { getPointsMethod, pointsContract, Request } from "../../../types";
import { useAppContext } from "../../hooks/useAppContext";

export default function Points() {
  const { wallet, points, onSetPoints } = useAppContext();

  useEffect(() => {
    if (!wallet) {
      onSetPoints(0);
      return;
    }

    const fetchPoints = async () => {
      const request: Request = {
        contract: pointsContract,
        method: getPointsMethod,
        params: [wallet.getAccount()?.address],
      };

      const result = Number(await readContract(request));
      onSetPoints(result);
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
        {points}
      </Text>
    </HStack>
  );
}
