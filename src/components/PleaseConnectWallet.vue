<template>
  <div class="text-center text-2xl font-bold">
    <slot v-if="$slots.default"></slot>
    <div v-else>Please connect wallet</div>
  </div>
  <ConnectWalletButton class="!w-max mx-auto mt-4" />
</template>
