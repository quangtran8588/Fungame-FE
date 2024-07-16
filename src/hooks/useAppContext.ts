import { createContext, useContext } from "react";
import { Wallet } from "thirdweb/wallets";

export interface AppContext {
  wallet: Wallet | undefined;
  points: bigint;
  trials: bigint;

  onSetWallet: React.Dispatch<React.SetStateAction<Wallet | undefined>>;
  onSetPoints: React.Dispatch<React.SetStateAction<bigint>>;
  onSetTrials: React.Dispatch<React.SetStateAction<bigint>>;
}

export const Context = createContext<AppContext | undefined>(undefined);

export function useAppContext() {
  const context = useContext(Context) as AppContext;

  return context;
}
