export interface TokenData {
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  iconURI?: string;
}

export interface SerializedToken {
  chainId: number;
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  isToken: Boolean;
  isNative: Boolean;
  logoURI?: string;
}

export enum TOKENS_KEYS {
  FROM = "from",
  TO = "to",
}

export interface TokensSelected {
  [TOKENS_KEYS.FROM]?: SerializedToken;
  [TOKENS_KEYS.TO]?: SerializedToken;
}

export enum TOKEN_TYPE {
  STABLE_COINS = "stable",
  ALL_COINS = "all",
}

export enum TOKEN_LIST_STEP {
  SELECT_TOKEN = "SELECT_TOKEN",
  IMPORT_CONFIRM = "IMPORT_CONFIRM",
  MANAGE_LIST = "MANAGE_LIST",
}

export enum MANAGE_LIST_TABS {
  LISTS = "LISTS",
  TOKEN = "TOKEN",
}

export enum MANAGE_LIST_URL_ITEM_TYPE {
  SWITCH = "SWITCH",
  LOADED = "LOADED",
  TO_IMPORT = "TO_IMPORT",
}
