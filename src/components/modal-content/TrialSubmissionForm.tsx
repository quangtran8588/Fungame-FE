import { useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Center,
  Input,
  Text,
  HStack,
  Select,
  Box,
} from "@chakra-ui/react";

import TransactionBtn from "../TransactionBtn";
import { fungameContract, sendGuess } from "../../../types";
import { useAppContext } from "../../hooks/useAppContext";
import { isBigNumber } from "../../utils/checkInput";

const btnUpStyles = {
  width: "70px",
  height: "30px",
  fontSize: "xs",
  color: "#fff",
  background: "#27ae60",
  borderRadius: "5px",
  border: "2px solid #2ecc71",
};

const btnDownStyles = {
  width: "70px",
  height: "30px",
  fontSize: "xs",
  color: "#fff",
  background: "#e74c3c",
  borderRadius: "5px",
  border: "2px solid #e57373",
};

interface Props {
  gameIds: bigint[];
  trialsPerDay: bigint;
}

export default function TrialSubmissionForm({ gameIds, trialsPerDay }: Props) {
  const [value, setValue] = useState<string>("0");
  const [gameId, setGameId] = useState<bigint>(BigInt(0));
  const [error, setError] = useState<string>("");
  const { points, trials } = useAppContext();

  //  Disable `Input`, `Select` and `Buttons` when:
  //  - No connected wallet
  //  - Games unavailable
  const isDisabled = gameIds.length === 0;

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGameId = BigInt(event.target.value);
    setGameId(selectedGameId);
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const inputValue = event.target.value;

    if (!isBigNumber(inputValue) || inputValue === "")
      setError("Invalid number");
    else {
      if (BigInt(inputValue) > points) setError("Insufficient points");
      else if (trials === trialsPerDay && BigInt(inputValue) === BigInt(0))
        setError("Free trials limit reached! Please raise extra.");
    }

    setValue(inputValue);
  };

  return (
    <Box color="gray.700">
      <FormControl id="select-game" mb={1}>
        <HStack alignItems="baseline" justifyContent="space-between">
          <FormLabel htmlFor="select-game" fontSize={{ base: "xs", md: "sm" }}>
            Select game:
          </FormLabel>
          <Select
            id="select-game"
            value={gameId.toString()}
            onChange={handleOnSelect}
            placeholder="Select your game"
            width={{ base: "170px", md: "180px" }}
            height="30px"
            fontSize={{ base: "xs", md: "sm" }}
            isDisabled={isDisabled}
          >
            {gameIds.map((gameId) => (
              <option
                value={gameId.toString()}
                key={gameId}
              >{`GameID = ${gameId.toString()}`}</option>
            ))}
          </Select>
        </HStack>
      </FormControl>

      <FormControl mb={5} id="value-input" isInvalid={error.length !== 0}>
        <FormLabel htmlFor="value-input" fontSize={{ base: "xs", md: "sm" }}>
          Raise extra points:
        </FormLabel>
        <Input
          id="value-input"
          value={value}
          onChange={handleOnInput}
          placeholder={`${value}`}
          isDisabled={isDisabled}
          size={{ base: "xs", md: "sm" }}
        />
        {error.length !== 0 && (
          <FormErrorMessage fontSize={{ base: "xs", md: "sm" }}>
            {error}
          </FormErrorMessage>
        )}
      </FormControl>

      <Center mb={5}>
        <Text fontSize={{ base: "sm", md: "md" }}>What's your guess?</Text>
      </Center>
      <HStack h="100%" justifyContent="center" gap={3} mt={5}>
        <TransactionBtn
          btnName="UP"
          request={{
            contract: fungameContract,
            method: sendGuess,
            params: [gameId, value, 1],
          }}
          styles={btnUpStyles}
          isDisabled={gameId === BigInt(0) ? true : false}
        />

        <TransactionBtn
          btnName="DOWN"
          request={{
            contract: fungameContract,
            method: sendGuess,
            params: [gameId, value, 2],
          }}
          styles={btnDownStyles}
          isDisabled={gameId === BigInt(0) ? true : false}
        />
      </HStack>
    </Box>
  );
}
