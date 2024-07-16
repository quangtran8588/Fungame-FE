/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box, chakra, useDisclosure } from "@chakra-ui/react";
import {
  prepareContractCall,
  TransactionReceipt,
  WaitForReceiptOptions,
} from "thirdweb/transaction";
import { TransactionButton } from "thirdweb/react";
import { VscError } from "react-icons/vsc";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";

import ModalWrapper from "../modals/ModalWrapper";
import TxStatus from "./modal-content/TxStatus";
import { Request } from "../../types";

const ChakraErrorIcon = chakra(VscError);

interface Props {
  btnName: string;
  request: Request;
  styles: any;
  isDisabled: boolean;
}

export default function TransactionBtn({
  btnName,
  request,
  styles,
  isDisabled,
}: Props) {
  const [txHash, setTxHash] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [error, setError] = useState<Error | undefined>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTxConfirmed = (receipt: TransactionReceipt) => {
    setAction("confirmed");
    setTxHash(receipt.transactionHash);
    onOpen();
  };
  const handleTxError = (error: Error) => {
    setError(error);
    setAction("error");
    onOpen();
  };
  const handledTxSent = (txResult: WaitForReceiptOptions) => {
    setAction("pending");
    setTxHash(txResult.transactionHash);
    onOpen();
  };

  const handleOnClose = () => {
    setError(undefined);
    setTxHash("");
    setAction("");
    onClose();
  };

  return (
    <>
      <TransactionButton
        transaction={() => {
          const tx = prepareContractCall({
            contract: request.contract,
            method: request.method,
            params: [...request.params],
          });
          return tx;
        }}
        onTransactionConfirmed={handleTxConfirmed}
        onError={handleTxError}
        onTransactionSent={handledTxSent}
        unstyled={true}
        disabled={isDisabled}
      >
        <Box
          alignContent="center"
          justifyContent="center"
          style={{
            ...styles,
            opacity: isDisabled ? 0.3 : 1,
            pointerEvents: isDisabled ? "none" : "auto",
          }}
          fontSize={styles.fontSize}
        >
          {btnName}
        </Box>
      </TransactionButton>
      <ModalWrapper
        isOpen={isOpen}
        onClose={handleOnClose}
        header={{
          title:
            action === "pending"
              ? "Waiting for confirmation"
              : action === "confirmed"
              ? "Transaction completed"
              : "Something went wrong",
          color: "#000",
          fontSize: { base: "xs", md: "sm" },
        }}
        closeBtn={{
          size: { base: "sm" },
          color: "gray.500",
        }}
      >
        <TxStatus
          Icon={
            action === "pending" ? (
              <Spinner size={{ base: "md" }} />
            ) : action === "confirmed" ? (
              <CheckCircleIcon color="green.500" boxSize={{ base: 6 }} />
            ) : (
              <ChakraErrorIcon color="red.500" boxSize={{ base: 8, md: 10 }} />
            )
          }
          txHash={txHash}
          errorString={error?.message}
        />
      </ModalWrapper>
      {/* <TxStatusModal
        isOpen={isOpen}
        onClose={onClose}
        reset={reset}
        action={action}
        Icon={
          action === "pending" ? (
            <Spinner size={{ base: "md" }} />
          ) : action === "confirmed" ? (
            <CheckCircleIcon color="green.500" boxSize={{ base: 6 }} />
          ) : (
            <ChakraErrorIcon color="red.500" boxSize={{ base: 8, md: 10 }} />
          )
        }
        txHash={txHash}
        errorString={error?.message}
      /> */}
    </>
  );
}
