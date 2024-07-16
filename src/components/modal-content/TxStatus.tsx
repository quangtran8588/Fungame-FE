import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Center, Link, Text } from "@chakra-ui/react";

interface Props {
  Icon: JSX.Element;
  txHash?: string;
  errorString?: string;
}

export default function TxStatus({ Icon, txHash, errorString }: Props) {
  return (
    <Center flexDirection="column" gap={5}>
      {Icon}
      {txHash && (
        <Link
          color="gray.700"
          fontSize={{ base: "xs", md: "sm" }}
          href={`${import.meta.env.VITE_NETWORK_EXPLORER}${txHash}`}
          isExternal
        >
          View Transaction <ExternalLinkIcon mx="2px" />
        </Link>
      )}
      {errorString && (
        <Text color="red.500" fontSize={{ base: "xs", md: "sm" }}>
          {errorString}
        </Text>
      )}
    </Center>
  );
}
