<script lang="ts" setup>
import type { PropType } from "vue";
import DefaultCoinIcon from "@/assets/images/icons/default.svg";

const props = defineProps({
  srcs: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});
const BAD_SRCS = {} as Record<string, boolean>;

const src = ref(props.srcs.find((el: string) => !BAD_SRCS[el]));
const getSrc = () => {
  src.value = props.srcs.find((el: string) => !BAD_SRCS[el]);
};
const myImgError = () => {
  if (src.value) BAD_SRCS[src.value] = true;
  getSrc();
};

watch(
  () => props.srcs,
  (val) => {
    if (val && val.length) {
      getSrc();
    }
  }
);
</script>

<template>
  <div class="items-center justify-center">
    <img
      v-if="src"
      :src="src"
      alt=""
      @error="myImgError"
      class="w-10 h-10 object-contain"
    />
    <img
      v-else
      :src="DefaultCoinIcon"
      alt=""
      class="w-10 h-10 object-contain"
    />
  </div>
</template>
