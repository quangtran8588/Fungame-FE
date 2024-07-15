import { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import WinningStatusModal from "../../modals/WinningStatusModal";
import TransactionBtn from "../TransactionBtn";
import {
  fungameContract,
  pointsContract,
  sendClaim,
  sendDailyClaim,
} from "../../../types";

const btnStyles = {
  width: "70px",
  height: "30px",
  fontSize: "xs",
  color: "#000",
  background: "#809fff",
  borderRadius: "5px",
};

export default function ClaimSubmissionForm() {
  const [claimOption, setClaimOption] = useState<string>("daily");
  const [gameId, setGameId] = useState<string>("0");
  const [error, setError] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnSelect = (option: string) => setClaimOption(option);

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const inputValue = event.target.value;

    if (isNaN(Number(inputValue)) || inputValue === "")
      setError("Invalid number");
    setGameId(inputValue);
  };

  return (
    <Box>
      <FormControl id="claim-option" mb={5}>
        <Center>
          <RadioGroup onChange={handleOnSelect} value={claimOption}>
            <Stack direction="row">
              <Radio value="daily" size={{ base: "sm" }}>
                Daily Claim
              </Radio>
              <Radio value="winning" size={{ base: "sm" }}>
                Winning Claim
              </Radio>
            </Stack>
          </RadioGroup>
        </Center>
      </FormControl>

      <FormControl mb={5} id="gameId-input" isInvalid={error.length !== 0}>
        <HStack alignItems="baseline" justifyContent="space-between">
          <HStack alignItems="baseline" justifyContent="flex-start" gap={0}>
            <FormLabel
              htmlFor="gameId-input"
              fontSize={{ base: "xs", md: "sm" }}
            >
              Game ID:
            </FormLabel>

            <Input
              id="gameId-input"
              value={gameId}
              onChange={handleOnInput}
              placeholder={`${gameId}`}
              background="gray.100"
              width={{ base: "150px", md: "200px" }}
              height="30px"
              fontSize={{ base: "xs", md: "sm" }}
              isDisabled={claimOption === "daily" ? true : false}
            />
          </HStack>

          <Button
            width={{ base: "70px" }}
            height={{ base: "30px" }}
            fontSize={{ base: "xs" }}
            background="#809fff"
            color="#000"
            onClick={onOpen}
            isDisabled={claimOption === "daily" || error ? true : false}
          >
            Check
          </Button>
          <WinningStatusModal
            isOpen={isOpen}
            onClose={onClose}
            gameId={Number(gameId)}
          />
        </HStack>

        <Center mt={5}>
          {error.length !== 0 && (
            <FormErrorMessage fontSize={{ base: "xs", md: "sm" }}>
              {error}
            </FormErrorMessage>
          )}
        </Center>

        <Center mt={5}>
          <TransactionBtn
            btnName="Claim"
            request={
              claimOption === "daily"
                ? {
                    contract: pointsContract,
                    method: sendDailyClaim,
                    params: [],
                  }
                : {
                    contract: fungameContract,
                    method: sendClaim,
                    params: [gameId],
                  }
            }
            styles={btnStyles}
            isDisabled={error ? true : false}
          />
        </Center>
      </FormControl>
    </Box>
  );
}
