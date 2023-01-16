<script lang="ts" setup>
import {
  useConnectWallet,
  useUserBalances,
  useModals,
  useTxHashPending,
} from "@/hooks";
import { DEFAULT_CHAIN_DATA } from "@/constants";
import { shortenAddress } from "@/helpers/formatter";

const drawerVisible = ref(false);
const { address: account, setModalConnectState } = useConnectWallet();
const { nativeBalance } = useUserBalances();
const { txHashPending } = useTxHashPending();
const { setLogoutModalState } = useModals();
</script>

<template>
  <header class="header">
    <div>
      <router-link to="/" class="border-none no-underline">
        <LogoText />
      </router-link>
    </div>
    <div class="hidden xl:block">
      <DefaultNavigation />
    </div>

    <div class="items-center hidden xl:flex">
      <ConnectWalletButton />
    </div>
    <div class="block xl:hidden">
      <button @click="drawerVisible = true">
        <MenuIcon class="" />
      </button>
    </div>
    <a-drawer
      title=""
      placement="right"
      :closable="false"
      :visible="drawerVisible"
      class="header__drawer"
      @close="drawerVisible = false"
    >
      <div class="flex justify-end mb-4">
        <button @click="drawerVisible = false">
          <CloseIcon class="w-4 h-4" />
        </button>
      </div>
      <div class="mb-10 flex justify-center">
        <!-- <Logo /> -->
        Logo
      </div>
      <DefaultNavigation class="mb-4" />
      <div class="">
        <BaseButton
          v-if="!account"
          @click="setModalConnectState(true)"
          variant="primary"
        >
          Connect Wallet
        </BaseButton>
        <BaseButton v-else variant="primary" @click="setLogoutModalState(true)">
          {{ shortenAddress(account) }}
        </BaseButton>
      </div>
    </a-drawer>
  </header>
</template>

<style lang="scss">
// .header__drawer {
//   .ant-drawer-content {
//     background: var(--primary);
//   }
// }

.header {
  @apply sticky top-0 w-full bg-white;
  @apply z-20;
  @apply rounded-lg;
  @apply flex justify-between p-4 items-center;
}

.button-connect {
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  // color: #ffffff;
  @apply w-full xl:w-auto;
  @apply rounded-xl;
}
.header__token-base {
  @apply rounded-xl;
  @apply bg-transparent;
  @apply p-3 text-xs font-bold text-center;
  @apply mr-0 mb-3 xl:mb-0 xl:mr-2;
}

.header__token-native {
  @apply rounded-xl;
  @apply bg-transparent;
  @apply p-3 text-xs font-bold text-center;
  @apply mr-0 mb-3 xl:mb-0 xl:mr-2;
}

.router-link-exact-active,
.router-link-active {
  @apply border-b-2 border-solid;
}
</style>
