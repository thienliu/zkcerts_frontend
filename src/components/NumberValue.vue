<script lang="ts" setup>
import { toCurrency } from "@/helpers/formatter";

defineProps({
  value: {
    type: [String, Number],
    default: "0",
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },

  dp: {
    type: Number,
    default: 6,
  },
  displayZero: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    default: "main",
  },
});
</script>

<template>
  <div class="leading-4 value">
    <span v-if="value">{{ prefix }}</span>
    {{ toCurrency(value, dp, displayZero) }}
    <span v-if="value">{{ suffix }}</span>
  </div>
</template>
