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

import { Request } from "../../types";
import TxStatusModal from "../modals/TxStatusModal";

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
  const [error, setError] = useState<Error | undefined>();
  const [txHash, setTxHash] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [action, setAction] = useState<string>("");

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

  const reset = () => {
    setError(undefined);
    setTxHash("");
    setAction("");
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
      <TxStatusModal
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
      />
    </>
  );
}
