import { useState } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { Wallet } from "thirdweb/wallets";

import { Context } from "./hooks/useAppContext";
import Navbar from "./components/navbar/Navbar";
import Mainboard from "./components/mainboard/Mainboard";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./utils/theme";

export default function App() {
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

  const context = {
    wallet: wallet,
    onSetWallet: setWallet,
  };

  return (
    <Context.Provider value={context}>
      <ThirdwebProvider>
        <Navbar />
        <Mainboard />
      </ThirdwebProvider>
    </Context.Provider>
  );
}
