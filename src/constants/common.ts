import type { CHAIN } from "@/types";

export const DEFAULT_CHAIN_ID = Number(
  import.meta.env.VITE_DEFAULT_CHAIN
) as CHAIN;
export const DEFAULT_GAS_LIMIT = import.meta.env
  .VITE_DEFAULT_GAS_LIMIT as string;
export const GAS_LIMIT_BUFFER_RATIO = import.meta.env
  .VITE_GAS_LIMIT_BUFFER_RATIO as string;
export const GAS_PRICE_BUFFER_RATIO = import.meta.env
  .VITE_GAS_PRICE_BUFFER_RATIO as string;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const SAVED_CONNECTOR_KEY = "SAVED_CONNECTOR";

export const CONTRACT_INTERVAL = 15000; // ms
export const API_INTERVAL = 15000;
export const CACHED_FARMS_STATIC_TIMES = 86400000; // 1day in ms
export const DEFAULT_GAS_PRICE = 500000000000;
export const API_LIMIT = 10;

export const API_V1_PREFIX = "/api/v1";
