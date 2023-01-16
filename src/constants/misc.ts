import { Percent } from "@uniswap/sdk-core";
import JSBI from "jsbi";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// one basis JSBI.BigInt
const BIPS_BASE = JSBI.BigInt(10000).toString();
export const ONE_BIPS = new Percent(JSBI.BigInt(1).toString(), BIPS_BASE);
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(
  JSBI.BigInt(100).toString(),
  BIPS_BASE
); // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(
  JSBI.BigInt(300).toString(),
  BIPS_BASE
); // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(
  JSBI.BigInt(500).toString(),
  BIPS_BASE
); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(
  JSBI.BigInt(1000).toString(),
  BIPS_BASE
); // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(
  JSBI.BigInt(1500).toString(),
  BIPS_BASE
); // 15%

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(
  JSBI.BigInt(50).toString(),
  BIPS_BASE
);

export const ZERO_PERCENT = new Percent("0");
export const TWO_PERCENT = new Percent(JSBI.BigInt(200).toString(), BIPS_BASE);
export const ONE_HUNDRED_PERCENT = new Percent("1");
export const BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000));
