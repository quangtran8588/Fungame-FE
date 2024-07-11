/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { TransactionButton } from "thirdweb/react";
import {
  prepareContractCall,
  TransactionReceipt,
  WaitForReceiptOptions,
} from "thirdweb/transaction";

import { useAppContext } from "../hooks/useAppContext";
import { Request } from "../../types";

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
  const [error, setError] = useState<Error>();
  error;

  const handleTxConfirmed = (receipt: TransactionReceipt) => {
    //  todo
    receipt;
  };
  const handleTxError = (error: Error) => {
    setError(error);
  };
  const handledTxSent = (txResult: WaitForReceiptOptions) => {
    txResult;
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
    </>
  );
}
