import { VStack } from "@chakra-ui/react";
import MarketPrice from "../MarketPrice";
import LastPrice from "../LastPrice";

export default function Header() {
  return (
    <VStack mt="30px" mb="10px" gap={3}>
      <MarketPrice />
      <LastPrice />
    </VStack>
  );
}
