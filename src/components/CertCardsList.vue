<script lang="ts" setup>
import { useDocuments, useConnectWallet } from "@/hooks";

const { documentsList } = useDocuments();
</script>

<template>
  <div
    v-if="documentsList.length"
    class="mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6"
  >
    <CertCardItem v-for="item in documentsList" :item="item" />
  </div>
  <a-empty v-else></a-empty>
</template>
