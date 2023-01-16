<script lang="ts" setup>
import { useConnectWallet, useModals, useTxHashPending } from "@/hooks";
import { shortenAddress } from "@/helpers/formatter";

const { address: account, setModalConnectState } = useConnectWallet();
const { txHashPending } = useTxHashPending();
const { setLogoutModalState } = useModals();
</script>

<template>
  <div>
    <BaseButton
      variant="primary"
      v-if="!account"
      @click="setModalConnectState(true)"
    >
      Connect Wallet
    </BaseButton>
    <template v-else>
      <BaseButton variant="primary" v-if="txHashPending" disabled class="p-3">
        <div class="flex items-center">
          <LoadingIndicator size="16px" class="mr-1" /> 1 tx pending
        </div>
      </BaseButton>
      <BaseButton variant="primary" v-else @click="setLogoutModalState(true)">
        {{ shortenAddress(account) }}
      </BaseButton>
    </template>
  </div>
</template>
