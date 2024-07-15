import { Box, Container } from "@chakra-ui/react";

import Header from "./mainboard/Header";
import Body from "./mainboard/Body";

export default function Mainboard() {
  return (
    <Container
      maxW={{
        base: "90%",
        sm: "60%",
        md: "50%",
        lg: "40%",
        xl: "35%",
        "2xl": "30%",
      }}
      bgGradient="radial-gradient(circle, #e0e7ff, #809fff, #001f4d)" // radial-gradient(circle, #000000, #ff0000, #800080)
      borderRadius="10px"
      border="3px #aaaaaa"
      borderStyle="double"
      mt="50px"
    >
      <Box
        bgGradient="linear-gradient(to top, #1a1a1a, #2e3a46)"
        borderRadius="10px"
        border="1px solid #4d4d4d"
        mt="20px"
        mb="30px"
      >
        <Header />
      </Box>

      <Box mt="50px">
        <Body />
      </Box>
    </Container>
  );
}
