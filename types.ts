/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContractOptions, createThirdwebClient, getContract } from "thirdweb";
import { BaseSepoliaTestnet } from "@thirdweb-dev/chains";
import { Abi } from "abitype";

export const chain = {
  id: BaseSepoliaTestnet.chainId,
  rpc: BaseSepoliaTestnet.rpc[1],
  url: BaseSepoliaTestnet.explorers[0].url,
};

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID,
});

export const pointsContract = getContract({
  client,
  chain,
  address: import.meta.env.VITE_EVM_POINTS_CONTRACT_ADDR,
});

export const fungameContract = getContract({
  client,
  chain,
  address: import.meta.env.VITE_FUNGAME_CONTRACT_ADDR,
});

export const appMetadata = {
  name: "Fungame Mini App",
  url: import.meta.env.VITE_URL,
  description: "Fungame: Mini App supports Web App and Telegram App",
};

export interface Request {
  contract: ContractOptions<Abi>;
  method: string;
  params: any[];
}

export interface GameSetting {
  freeGuessPerDay: number;
  fixedReward: number;
  windowTime: number;
  lockoutTime: number;
}

export const methodClaim = "function claim()";

export const getStartTimeMethod =
  "function START_TIME() external view returns (uint256)";

export const getPointsMethod =
  "function points(address) external view returns (uint256)";

export const getGuessTrialsMethod =
  "function numOfGuesses(address,uint256) external view returns (uint256)";

export const getCurrentGameMethod =
  "function currentGame() external view returns (uint256)";

export const getSettingsMethod =
  "function settings() external view returns (uint64,uint64,uint64,uint64)";

export const getGameResult =
  "function games(uint256) external view returns (uint256, uint256)";

export const queryStartTime: Request = {
  contract: fungameContract,
  method: getStartTimeMethod,
  params: [],
};

export const queryCurrentGameId: Request = {
  contract: fungameContract,
  method: getCurrentGameMethod,
  params: [],
};

export const querySettings: Request = {
  contract: fungameContract,
  method: getSettingsMethod,
  params: [],
};
