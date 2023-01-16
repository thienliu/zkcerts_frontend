<script setup lang="ts">
import { toClipboard } from "@soerenmartius/vue3-clipboard";
import { useModals, useConnectWallet, useUserBalances } from "@/hooks";
import { DEFAULT_CHAIN_DATA } from "@/constants";

const { isShowLogoutModal, setLogoutModalState } = useModals();
const { address, resetState } = useConnectWallet();
const { nativeBalance } = useUserBalances();
const handleLogout = () => {
  setLogoutModalState(false);
  resetState();
};
</script>

<template>
  <BaseModal v-model="isShowLogoutModal" title="Your wallet">
    <div v-if="address">
      <div class="">
        <div class="py-2 font-semibold">
          <span class="font-medium break-all"> {{ address }}</span>
        </div>
        <div class="mb-4">
          <NumberValue
            :value="nativeBalance"
            :suffix="DEFAULT_CHAIN_DATA.nativeCurrency.symbol"
          />
        </div>
        <div class="flex font-light" ref="container">
          <a
            class="flex items-center mr-6 group"
            target="_blank"
            :href="`${DEFAULT_CHAIN_DATA.explorer}address/${address}`"
          >
            <ExternalLinkIcon class="mr-1 group-hover:opacity-70" />
            <span class="group-hover:opacity-70">View on explorer</span>
          </a>
          <a
            class="flex items-center cursor-pointer group"
            @click="toClipboard(address)"
          >
            <CopyIcon class="mr-1 group-hover:opacity-70 w-4 h-4" />
            <span class="group-hover:opacity-70">Copy address</span>
          </a>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <button
          @click="handleLogout"
          class="px-6 py-3 cursor-pointer hover:opacity-70 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  </BaseModal>
</template>
