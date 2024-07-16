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
import { readContract } from "thirdweb/transaction";
import { ethers } from "ethers";

import TransactionBtn from "../TransactionBtn";
import {
  fungameContract,
  getWinningStatus,
  pointsContract,
  Request,
  sendClaim,
  sendDailyClaim,
} from "../../../types";
import ModalWrapper from "../../modals/ModalWrapper";
import WinningStatus from "./WinningStatus";
import { useAppContext } from "../../hooks/useAppContext";
import { isBigNumber } from "../../utils/checkInput";

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
  const [isWinning, setIsWinning] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallet } = useAppContext();

  const handleOnSelect = (option: string) => setClaimOption(option);

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const inputValue = event.target.value;

    if (!isBigNumber(inputValue) || inputValue === "")
      setError("Invalid number");
    else if (BigInt(inputValue) > ethers.MaxUint256) setError("Number too big");
    setGameId(inputValue);
  };

  const handleOnCheck = async () => {
    const request: Request = {
      contract: fungameContract,
      method: getWinningStatus,
      params: [wallet?.getAccount()?.address, gameId],
    };

    const result = (await readContract(request)) as unknown as boolean;
    setIsWinning(result);
    onOpen();
  };

  const handleOnClose = () => {
    setIsWinning(false);
    onClose();
  };

  return (
    <Box color="gray.700">
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
            onClick={handleOnCheck}
            isDisabled={claimOption === "daily" || error ? true : false}
          >
            Check
          </Button>
          <ModalWrapper
            isOpen={isOpen}
            onClose={handleOnClose}
            header={{
              title: "Fun Game",
              color: "#000",
              fontSize: { base: "sm" },
            }}
            closeBtn={{
              size: { base: "sm" },
              color: "gray.500",
            }}
          >
            <WinningStatus isWinning={isWinning} />
          </ModalWrapper>
          {/* <WinningStatusModal
            isOpen={isOpen}
            isWinning={isWinning}
            onClose={onClose}
            clearWinning={clearWinning}
          /> */}
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
