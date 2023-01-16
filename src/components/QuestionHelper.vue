<script setup lang="ts">
defineProps({
  placement: {
    type: String,
    default: "right",
  },
});
</script>

<template>
  <a-tooltip :placement="placement">
    <template #title>
      <slot></slot>
    </template>
    <HelpIcon class="ml-2 w-6 h-6" />
  </a-tooltip>
</template>
