import { Box, ListItem, Text, UnorderedList } from "@chakra-ui/react";

export default function GameInfo() {
  return (
    <Box color="gray.200">
      <Box
        bgGradient="linear-gradient(135deg, #2b2e4a, #5d6ab3)"
        border="1px solid #6a7ec9"
        borderRadius="10px"
        padding={3}
      >
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold">
          How to earn points:
        </Text>
        <UnorderedList spacing={1} fontSize={{ base: "xs", md: "sm" }}>
          <ListItem listStyleType="'- '">
            Daily points claim: 20 pts/day
          </ListItem>
          <ListItem listStyleType="'- '">Participate in the Fun Game</ListItem>
        </UnorderedList>
      </Box>

      <Box
        bgGradient="linear-gradient(135deg, #2b2e4a, #5d6ab3)"
        border="1px solid #6a7ec9"
        borderRadius="10px"
        padding={3}
        mt={3}
      >
        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold">
          Game mechanics:
        </Text>
        <UnorderedList spacing={1} fontSize={{ base: "xs", md: "sm" }}>
          <ListItem listStyleType="'- '">Guess price Up/Down</ListItem>
          <ListItem listStyleType="'- '">
            Number of free trials: 3 trials/day
          </ListItem>
          <ListItem listStyleType="'- '">
            Each mini-game:
            <UnorderedList>
              <ListItem>Duration: 1 hour</ListItem>
              <ListItem>Lockout: 15 minutes before game ends</ListItem>
              <ListItem>Submission: only one trial</ListItem>
            </UnorderedList>
          </ListItem>
          <ListItem listStyleType="'- '">
            Reward:
            <UnorderedList>
              <ListItem>
                Free trials: raising extra (optional)
                <UnorderedList>
                  <ListItem listStyleType="'+ '">
                    Correct guess (no extra): 10 pts
                  </ListItem>
                  <ListItem listStyleType="'+ '">
                    Correct guess (with extra): 2*extra + 10 pts
                  </ListItem>
                  <ListItem listStyleType="'+ '">
                    Incorrect guess (no extra): nothing
                  </ListItem>
                  <ListItem listStyleType="'+ '">
                    Incorrect guess (with extra): losing extra pts
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                After free trials: raising extra (require)
                <UnorderedList>
                  <ListItem listStyleType="'+ '">
                    Correct guess: 2*extra pts
                  </ListItem>
                  <ListItem listStyleType="'+ '">
                    Incorrect guess: losing extra pts
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  );
}
