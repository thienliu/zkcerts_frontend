import { useStorage } from "@vueuse/core";
import type {
  CoinGeckoPriceResponseData,
  CoingeckoSupportedCurrency,
} from "@/types";

const usdPriceMap = reactive(new Map<string, number>());
const coingeckoSupportedCurrencies = useStorage<CoingeckoSupportedCurrency[]>(
  "coingeckoSupportedCurrencies",
  []
);

export const useUsdPrices = () => {
  const fetchSupportedCurrencies = async () => {
    if (coingeckoSupportedCurrencies.value.length) return;
    const list = await fetch(`https://api.coingecko.com/api/v3/coins/list`, {
      method: "GET",
    });
    const data = (await list.json()) as CoingeckoSupportedCurrency[];
    coingeckoSupportedCurrencies.value = [...data];
  };
  const fetchUsdPrices = async (ids: string[]) => {
    const prices = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
        ","
      )}&vs_currencies=usd`,
      {
        method: "GET",
      }
    );
    const data = (await prices.json()) as CoinGeckoPriceResponseData;
    ids.map((id) => {
      const usdPrice = data[id];
      if (usdPrice) {
        usdPriceMap.set(id, usdPrice.usd);
      } else {
        usdPriceMap.set(id, 0);
      }
    });
  };
  const getUsdId = (symbol: string, name: string) => {
    return (
      coingeckoSupportedCurrencies.value.find(
        (el) =>
          el.symbol.toLowerCase() === symbol.toLowerCase() &&
          el.name.toLowerCase() === name.toLowerCase()
      )?.id || ""
    );
  };
  return {
    fetchUsdPrices,
    fetchSupportedCurrencies,
    getUsdId,
    usdPriceMap,
  };
};
