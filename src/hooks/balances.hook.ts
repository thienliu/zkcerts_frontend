import {
  getNativeBalance,
  getTokenBalances,
} from "@/services/blockchain/erc20";
import { DEFAULT_CHAIN_ID, ZERO_ADDRESS } from "@/constants";

import { useConnectWallet } from "./wallet.hook";
import type { SerializedToken } from "@/types";

const userBalanceMap = reactive(new Map<string, string>());

export const useUserBalances = () => {
  const loadingBalance = ref(false);

  const { address } = useConnectWallet();
  const fetchNativeBalances = async () => {
    const native = await getNativeBalance({
      address: address.value,
      chainId: DEFAULT_CHAIN_ID,
      decimals: 18,
    });
    userBalanceMap.set(ZERO_ADDRESS, native);
  };
  const fetchTokensBalances = async (tokens: SerializedToken[]) => {
    loadingBalance.value = true;
    const balances = await getTokenBalances({
      account: address.value,
      chainId: DEFAULT_CHAIN_ID,
      tokens,
    });
    loadingBalance.value = false;
    if (balances) {
      tokens.forEach((token, idx) => {
        userBalanceMap.set(token.address.toLowerCase(), balances[idx]);
      });
    }
  };
  const nativeBalance = computed(() => {
    return userBalanceMap.get(ZERO_ADDRESS) || "0";
  });

  const getBalance = (token: SerializedToken) => {
    if (!address.value) return "0";
    if (!token.isToken) return nativeBalance.value;
    return userBalanceMap.get(token.address.toLowerCase()) || "0";
  };
  return {
    userBalanceMap,
    nativeBalance,
    loadingBalance,
    getBalance,
    fetchNativeBalances,
    fetchTokensBalances,
  };
};
