/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export interface Ticker {
  symbol: string;
  price: string;
}

export interface TickerResponse {
  ticker: Ticker | undefined;
  error: Error | undefined;
}

export const getPriceTicker = async (
  symbol: string
): Promise<TickerResponse> => {
  try {
    const response = await axios.get(import.meta.env.VITE_PRICE_TICKER_API, {
      params: {
        symbol: symbol,
      },
    });
    return {
      ticker: response.data,
      error: undefined,
    };
  } catch (error: any) {
    return {
      ticker: undefined,
      error: error,
    };
  }
};
