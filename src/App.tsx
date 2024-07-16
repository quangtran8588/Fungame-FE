import { useState } from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { Wallet } from "thirdweb/wallets";

import Navbar from "./components/Navbar";
import Mainboard from "./components/Mainboard";
import { AppContext, Context } from "./hooks/useAppContext";

export default function App() {
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [points, setPoints] = useState<bigint>(BigInt(0));
  const [trials, setTrials] = useState<bigint>(BigInt(0));

  const context: AppContext = {
    wallet: wallet,
    points: points,
    trials: trials,
    onSetWallet: setWallet,
    onSetPoints: setPoints,
    onSetTrials: setTrials,
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
