import type {
  PoolStaticData,
  PoolDynamicData,
  PoolUserData,
} from "@/services/blockchain";

export enum USD_PAIR_TYPE {
  TOKEN0 = "TOKEN0",
  TOKEN1 = "TOKEN1",
}

export enum DISPLAY_TYPE {
  LIST = "LIST",
  GRID = "GRID",
}

export enum FARM_SORT_TYPE {
  MULTIPLIER = "multiplier",
  APR = "apr",
  EARNED = "earned",
  LIQUIDITY = "tvl",
  FEE = "fee",
}

export type FarmPoolDisplay = PoolStaticData & {
  token0Symbol: string | undefined;
  token1Symbol: string | undefined;
  lpSymbol: string;
  tvl: string;
} & PoolDynamicData &
  PoolUserData;
