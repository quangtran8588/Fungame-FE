import { VStack, Text } from "@chakra-ui/react";

export default function MarketPrice() {
  return (
    <VStack w="100%" h="120px" alignItems="center" justifyContent="center">
      <Text
        fontSize={{ base: "large", md: "x-large" }}
        bgGradient="linear-gradient(to top, #f39c12, #e74c3c)"
        bgClip="text"
        mt={3}
      >
        BTC/USDT
      </Text>
      <Text fontSize={{ base: "xx-large", md: "xxx-large" }}>51,000</Text>
    </VStack>
  );
}
