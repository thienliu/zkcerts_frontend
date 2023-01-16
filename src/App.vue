<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useInterval } from "@vueuse/core";
import { CONTRACT_INTERVAL, DEFAULT_CHAIN_ID } from "@/constants";
import { useStorage } from "@vueuse/core";

import { useConnectWallet, useUserBalances, useUsdPrices } from "@/hooks";
import type { ConnectorResponse } from "@/types/connector.type";
import { signMessage } from "@/services/blockchain";
import { getNonce, getTokens } from "@/services/api/modules/auth";
import { GetTokenGrantType } from "@/types";

const counter = useInterval(CONTRACT_INTERVAL);
const { fetchNativeBalances } = useUserBalances();

const { fetchSupportedCurrencies } = useUsdPrices();
const {
  showModalConnect,
  cachedConnector,
  updateState,
  resetState,
  address,
  accessToken,
  provider,
  setTokens,
} = useConnectWallet();

const toast = useToast();
const { t } = useI18n();

const loginWithTokens = async (account: string, provider: any) => {
  const nonce = await getNonce(account);
  const message = `${nonce}`;
  const signature = await signMessage(message, provider);
  const tokens = await getTokens({
    address: account,
    signature,
    grantType: GetTokenGrantType.signature,
  });
  setTokens(tokens);
};

const onConnectResponse = async (data: ConnectorResponse) => {
  try {
    const { account, chainId, id: connectorId, provider, connect } = data;
    if (!accessToken.value) {
      await loginWithTokens(account, provider);
    }
    updateState({
      connectedAddress: account,
      connectedProvider: provider,
      connectedChainId: chainId,
      connector: connectorId,
      connectorFunc: connect,
    });
  } catch (error: any) {
    console.error(error);
    toast.error(error.message);
    resetState();
  }
};

const onConnectError = (error: any) => {
  console.error(error);
  resetState();
  if (error?.code === 4001) {
    toast.error(t("message.connect-wallet-rejected-error"));
  } else if (error.message) {
    toast.error(error.message);
  } else if (error) {
    toast.error(error);
  }
};

fetchSupportedCurrencies();

watch(address, (account, prevAccount) => {
  if (account) {
    fetchNativeBalances();
    if (prevAccount && account !== prevAccount) {
      loginWithTokens(account, provider.value);
    }
  }
});

watch(counter, () => {
  if (address.value) {
    fetchNativeBalances();
  }
});
</script>

<template>
  <div class="app__wrapper">
    <DefaultHeader />
    <div class="app__bg__top">
      <div class="app__bg__top__gradient"></div>
      <div class="app__bg__top__blur"></div>
    </div>
    <div class="main-container">
      <div class="w-full">
        <RouterView />
      </div>
    </div>
    <ConnectComponent
      :chain="DEFAULT_CHAIN_ID"
      v-model="showModalConnect"
      :cached-connector="cachedConnector"
      @response="onConnectResponse"
      @error="onConnectError"
    />
    <LogoutModal />
    <ExchangeSelectTokenModal />
    <ModalWaitingTx />
    <ModalTxRejected />
    <ModalTxSubmitted />
    <ModalTransactionSettings />
    <div class="app__bg__bottom">
      <div class="app__bg__bottom__gradient"></div>
      <div class="app__bg__bottom__blur"></div>
    </div>
  </div>
</template>

<style lang="scss">
.main-container {
  @apply z-10;
  @apply px-4 md:px-6 py-6 max-w-full;
  // @apply overflow-x-hidden overflow-y-auto;
  @apply flex-1;
  @apply flex flex-col;
  @apply text-primary;

  // height: calc(100vh - 90px);
}
#app {
  @apply relative;
  font-family: "Inter", sans-serif;
  @apply min-h-full;
  @apply bg-primary-bg;
}

.app__wrapper {
  @apply p-6;
  @apply mx-auto;
  @apply flex flex-col;
  @screen laptop {
    @apply w-[1200px];
  }
}

.app__bg__top {
  @apply max-h-[500px] h-1/2;
  @apply z-0;
  @apply absolute left-0 right-0 top-0;
  &__gradient {
    background-color: #f4f4f5;
    background-image: radial-gradient(at 95% 0, #68b792 0, transparent 40%),
      radial-gradient(at 85% 12%, #e7a7b2 0, transparent 50%),
      radial-gradient(at 5% 6%, #7cb6dc 0, transparent 40%),
      radial-gradient(at 16% 13%, #7a38a5 0, transparent 50%),
      radial-gradient(at 72% 62%, #cdcda4 0, transparent 50%);
    @apply absolute inset-0;
  }
  &__blur {
    background: linear-gradient(0deg, #f1f2f3, transparent),
      url("/images/noise.svg");
    @apply absolute inset-0;
  }
}
.app__bg__bottom {
  @apply z-0;

  @apply max-h-[400px] h-1/2;
  @apply absolute left-0 right-0 bottom-0;
  &__gradient {
    background-color: #f4f4f5;
    background-image: radial-gradient(at 95% 100%, #68b792 0, transparent 40%),
      radial-gradient(at 85% 112%, #e7a7b2 0, transparent 50%),
      radial-gradient(at 5% 106%, #7cb6dc 0, transparent 40%),
      radial-gradient(at 16% 113%, #7a38a5 0, transparent 50%),
      radial-gradient(at 95% 42%, #cdcda4 0, transparent 50%);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &__blur {
    background: linear-gradient(0deg, transparent, #f1f2f3),
      url("/images/noise.svg");
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
</style>
