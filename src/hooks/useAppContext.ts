import { createContext, useContext } from "react";
import { Wallet } from "thirdweb/wallets";

export interface AppContext {
  wallet: Wallet | undefined;
  onSetWallet: React.Dispatch<React.SetStateAction<Wallet | undefined>>;
}

export const Context = createContext<AppContext | undefined>(undefined);

export function useAppContext() {
  const context = useContext(Context) as AppContext;

  return context;
}
