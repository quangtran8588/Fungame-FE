import { VStack, Text, Box, chakra } from "@chakra-ui/react";
import { RiEmotionHappyFill, RiEmotionUnhappyFill } from "react-icons/ri";

const ChakraHappyEmotionIcon = chakra(RiEmotionHappyFill);
const ChakraUnhappyEmotionIcon = chakra(RiEmotionUnhappyFill);

interface Props {
  isWinning: boolean;
}

export default function WinningStatus({ isWinning }: Props) {
  return (
    <VStack justifyContent="center" gap={5} color="gray.700">
      <Text color={isWinning ? "#ff8c00" : "#9370DB"}>
        {isWinning
          ? "Congratulations! You're a winner!"
          : "Sorry! You're not a winner!"}
      </Text>

      <Box>
        {isWinning ? (
          <ChakraHappyEmotionIcon color="#32CD32 " size="50px" />
        ) : (
          <ChakraUnhappyEmotionIcon color="#9370DB" size="45px" />
        )}
      </Box>
    </VStack>
  );
}
