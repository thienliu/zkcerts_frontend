import { useInterval } from "@vueuse/core";
import { CONTRACT_INTERVAL } from "@/constants";

export const useIntervalUpdate = (
  callback: Function,
  interval = CONTRACT_INTERVAL
) => {
  const counter = useInterval(interval);
  watch(counter, () => {
    callback();
  });
  return {
    counter,
  };
};
