<script lang="ts" setup>
import { useModals } from "@/hooks";
const { isShowModalWaitingConfirmTx, waitingModalContent } = useModals();
</script>

<template>
  <BaseModal
    v-model="isShowModalWaitingConfirmTx"
    title="Waiting for Confirmation"
  >
    <div class="box-border p-4">
      <div class="py-4 flex items-center justify-center flex-col">
        <SpinIcon class="animate-spin w-36 h-36" />
        <div class="mt-10 mb-4 text-xl text-center">
          Waiting for Confirmation
        </div>
        <div
          class="text-xs font-medium mt-6"
          v-html="waitingModalContent"
        ></div>
        <div class="text-xs font-medium mt-1">
          Confirm transaction in your wallet
        </div>
      </div>
    </div></BaseModal
  >
</template>
