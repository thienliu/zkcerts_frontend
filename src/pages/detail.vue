<script lang="ts" setup>
import { useConnectWallet } from "@/hooks";

const { address } = useConnectWallet();
</script>

<template>
  <router-view v-if="address"></router-view>
  <PleaseConnectWallet v-else></PleaseConnectWallet>
</template>
