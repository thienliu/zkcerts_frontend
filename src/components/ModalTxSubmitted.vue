<script lang="ts" setup>
import { useModals } from "@/hooks";
import { DEFAULT_CHAIN_DATA } from "@/constants";

const { isShowModalTxSubmitted, submittedTxHash } = useModals();
</script>

<template>
  <BaseModal v-model="isShowModalTxSubmitted" title="Transaction Submitted">
    <div class="box-border p-4">
      <div class="pb-16 pt-12 flex items-center justify-center flex-col">
        <SuccessIcon class="w-16 h-16" />
        <a
          :href="`${DEFAULT_CHAIN_DATA.explorer}tx/${submittedTxHash}`"
          target="_blank"
          class="text-sm font-semibold mt-3.5 flex items-center"
        >
          View on explorer
        </a>
      </div>
    </div></BaseModal
  >
</template>
