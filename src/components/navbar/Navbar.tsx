import { Box, Flex } from "@chakra-ui/react";
import ConnectWalletButton from "./ConnectWalletButton";

export default function Navbar() {
  return (
    <Box bg="transparent" px={5}>
      <Flex h={16} align="center" justifyContent="flex-end">
        <ConnectWalletButton />
      </Flex>
    </Box>
  );
}
