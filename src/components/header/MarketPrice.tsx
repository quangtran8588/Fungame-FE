import { useEffect, useState } from "react";
import { VStack, Text } from "@chakra-ui/react";

import {
  Ticker,
  getPriceTicker,
  TickerResponse,
} from "../../utils/fetchPriceTicker";

export default function MarketPrice() {
  const [ticker, setTicker] = useState<Ticker | undefined>();
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    const fetchTickerPrice = async () => {
      const response: TickerResponse = await getPriceTicker(
        import.meta.env.VITE_SYMBOL
      );

      setError(response.error);
      setTicker(response.ticker);
    };

    fetchTickerPrice();
    const intervalId = setInterval(fetchTickerPrice, 10000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <VStack w="100%" h="120px" alignItems="center" justifyContent="center">
      <Text
        fontSize={{ base: "large", md: "x-large" }}
        bgGradient="linear-gradient(to top, #f39c12, #e74c3c)"
        bgClip="text"
        mt={3}
      >
        {!error ? ticker?.symbol : "N/A"}
      </Text>
      <Text fontSize={{ base: "xx-large", md: "xxx-large" }}>
        {!error ? parseFloat(ticker?.price as string).toFixed(2) : "N/A"}
      </Text>
    </VStack>
  );
}
