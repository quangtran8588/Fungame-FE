import { ConnectButton } from "thirdweb/react";
import { Wallet, createWallet } from "thirdweb/wallets";

import { client, chain, appMetadata } from "../../../types";
import { useAppContext } from "../../hooks/useAppContext";

const MetaMask = createWallet("io.metamask");
const WalletConnect = createWallet("walletConnect");

export default function ConnectWalletButton() {
  const { onSetWallet } = useAppContext();

  const wallets: Wallet[] = [WalletConnect, MetaMask];

  const handleConnect = (connectedWallet: Wallet) => {
    onSetWallet(connectedWallet);
  };

  return (
    <ConnectButton
      appMetadata={appMetadata}
      client={client}
      wallets={wallets}
      onDisconnect={() => onSetWallet(undefined)}
      onConnect={handleConnect}
      autoConnect={false}
      chain={chain}
      theme="light"
      connectModal={{ size: "compact" }}
      connectButton={{
        style: { width: "150px", height: "45px", border: "2px solid #809fff" },
      }}
    />
  );
}
