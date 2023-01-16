import type { SerializedToken } from "./token.type";

export interface LiquidityPair {
  token0: SerializedToken;
  token1: SerializedToken;
}

export interface UserLiquidity {
  token0: SerializedToken;
  token1: SerializedToken;
  token0Deposited: string | number;
  token1Deposited: string | number;
  userPoolBalance: string | number;
  sharePool: string | number;
}
export interface LiquidityMinted {
  amountMinted: string;
  slippage: string;
  sharePool: string;
  sharePoolExact: string;
  isLessThan: boolean;
}
