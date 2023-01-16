<script lang="ts" setup>
const props = defineProps({
  variant: {
    type: String,
    default: "main",
  },
});
</script>
<template>
  <div :class="['base-card', `base-card--${props.variant}`]">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-card {
  @apply p-6;
  @apply rounded-lg;
  @apply bg-white border border-gray-200;
  @apply shadow-lg;
  &--padding-small {
    @apply py-4;
  }
}
</style>
