import type { TransactionReceipt } from "@ethersproject/abstract-provider";
import { h } from "vue";
import type { WatchSource } from "vue";
import {
  DEFAULT_GAS_LIMIT,
  DEFAULT_APPROVE_AMOUNT,
  DEFAULT_CHAIN_ID,
  DEFAULT_CHAIN_DATA,
} from "@/constants";
import { i18n } from "@/plugins/i18n";
import { getGasPrice } from "@/services/blockchain/ethers";
import { checkAllowance, approve } from "@/services/blockchain/erc20";
import { BigNumber, unshift, isNativeAsset, toComputeds } from "@/utils";
import type { CHAIN } from "@/types";
import { NotificationType } from "@/types";
import { useConnectWallet } from "./wallet.hook";
import { useModals } from "./modals.hook";
import { openNotification } from "./notification.hook";

export type SendTxOptions = {
  call: Function;
  params: any;
  txConfirmContent: string;
  txSuccessContent: string;
};

const { t } = i18n.global;
const gasPrice = ref("0");
const approveDataMap = reactive(new Map<string, string>());
const txHashPending = ref("");

export const useGasFee = () => {
  const fetchGasPrice = async (chainId: CHAIN) => {
    const rawGas = await getGasPrice(chainId);
    if (rawGas) {
      gasPrice.value = unshift(rawGas, 18);
    }
  };

  const defaultGasFee = computed(() => {
    const fee = new BigNumber(DEFAULT_GAS_LIMIT)
      .times(gasPrice.value)
      .toString();
    return fee;
  });
  return {
    gasPrice,
    defaultGasFee,
    fetchGasPrice,
  };
};

export const useTxHashPending = () => {
  return {
    txHashPending,
  };
};

export const useSendTx = async (options: SendTxOptions) => {
  const { address, provider } = useConnectWallet();
  const { setModalTxSubmitted, setModalWaitingTxState, setModalTxRejected } =
    useModals();
  const receipt = ref<TransactionReceipt>();
  const loadingUserConfirm = ref(false);
  const loadingTx = ref(false);
  const txHash = ref("");
  const action = async () => {
    try {
      setModalWaitingTxState(true, options.txConfirmContent);
      const txHashCallback = (hash: string) => {
        txHash.value = hash;
        loadingTx.value = true;
        loadingUserConfirm.value = false;
        setModalWaitingTxState(false);
        setModalTxSubmitted(true, hash);
        txHashPending.value = hash;
      };
      if (options.call) {
        const txReceipt = await options.call({
          ...options.params,
          getTxHashCallback: txHashCallback,
          account: address.value,
          provider: provider.value,
          chainId: DEFAULT_CHAIN_ID,
        });
        receipt.value = txReceipt;

        loadingTx.value = false;
        // setModalTxSubmitted(false);
        txHashPending.value = "";
        openNotification({
          title: h("div", {
            class: "mb-4 font-bold",
            innerHTML: options.txSuccessContent,
          }),
          description: h(
            "a",
            {
              href: `${DEFAULT_CHAIN_DATA.explorer}/tx/${receipt.value?.transactionHash}`,
              target: "_blank",
            },
            ["View on explorer"]
          ),
          type: NotificationType.SUCCESS,
        });
      }
    } catch (error: any) {
      loadingUserConfirm.value = false;
      loadingTx.value = false;
      receipt.value = undefined;
      txHashPending.value = "";
      console.error(error);

      setModalWaitingTxState(false);
      if (error && error.code === 4001) {
        setModalTxRejected(true);
      } else {
        openNotification({
          title: "Transaction failed",
          type: NotificationType.ERROR,
          description: error && error.message ? error.message : error,
        });
      }
    }
  };
  await action();
};

export const useApprove = (options: {
  spenderAddress: WatchSource<string | undefined>;
  tokenAddress: WatchSource<string | undefined>;
  tokenDecimals: WatchSource<number | undefined>;
  amount: WatchSource<string>;
}) => {
  const {
    spenderAddress, //
    tokenAddress,
    tokenDecimals,
    amount,
  } = toComputeds({
    ...options,
  });
  const allowance = ref("0");
  const isFetchedAllowance = ref(false);
  const loading = ref(false);

  const { address } = useConnectWallet();
  const shouldApprove = computed(() => {
    return (
      !!address.value &&
      new BigNumber(allowance.value).lt(amount.value) &&
      isFetchedAllowance.value
    );
  });
  const updateAllowance = async (forceUpdate = false) => {
    if (!address.value) {
      allowance.value = "0";
      isFetchedAllowance.value = false;
    } else if (
      tokenAddress.value &&
      spenderAddress.value &&
      tokenDecimals.value
    ) {
      if (isNativeAsset(tokenAddress.value)) {
        allowance.value = DEFAULT_APPROVE_AMOUNT;
      } else {
        const key = `${address.value}_${tokenAddress.value}_${spenderAddress.value}`;
        const cachedAllowance = approveDataMap.get(key);
        if (cachedAllowance && !forceUpdate) {
          allowance.value = cachedAllowance;
          isFetchedAllowance.value = true;
          return;
        }
        const rawAllowance = await checkAllowance({
          tokenAddress: tokenAddress.value,
          userAddress: address.value,
          spenderAddress: spenderAddress.value,
          chainId: DEFAULT_CHAIN_ID,
        });
        allowance.value = unshift(rawAllowance, tokenDecimals.value);
        approveDataMap.set(key, allowance.value);
      }

      isFetchedAllowance.value = true;
    }
  };
  const handleApprove = async (symbol?: string) => {
    loading.value = true;
    const txConfirmContent = `Approve ${symbol || "token"} spending`;
    const options: SendTxOptions = {
      call: approve,
      params: {
        tokenAddress: tokenAddress.value || "",
        amount: DEFAULT_APPROVE_AMOUNT,
        spender: spenderAddress.value || "",
      },
      txConfirmContent,
      txSuccessContent: `Approve ${symbol || "token"} spending`,
    };
    await useSendTx(options);
    updateAllowance(true);
    loading.value = false;
  };
  watch([address, tokenAddress], () => updateAllowance(), {
    immediate: true,
  });

  return {
    shouldApprove,
    isFetchedAllowance,
    loading,
    allowance,
    updateAllowance,
    handleApprove,
  };
};
