<script lang="ts" setup>
import { useModals } from "@/hooks";
const { isShowModalTxRejected } = useModals();
</script>

<template>
  <BaseModal v-model="isShowModalTxRejected" title="">
    <div class="box-border p-4">
      <div class="py-4 flex items-center justify-center flex-col">
        <ErrorIcon />
        <div class="text-xl mt-3.5">Transaction rejected</div>
      </div>
    </div></BaseModal
  >
</template>
