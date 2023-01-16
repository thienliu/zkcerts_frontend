<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  titleClasses: {
    type: String,
    default: "",
  },
  afterCloseCallback: {
    type: Function,
    default: () => {},
  },
});
const emit = defineEmits(["update:modelValue"]);
const visible = ref(false);
const handleAfterClose = () => {
  emit("update:modelValue", false);
  props.afterCloseCallback();
};

watch(
  () => props.modelValue,
  () => {
    visible.value = props.modelValue;
  }
);
</script>

<template>
  <a-modal
    v-bind="$attrs"
    v-model:visible="visible"
    wrap-class-name="base-modal"
    :after-close="handleAfterClose"
    :destroy-on-close="true"
    centered
    :footer="null"
  >
    <template #title>
      <div class="text-center relative">
        <div class="absolute top-0 left-4">
          <slot name="icon"></slot>
        </div>
        <div class="text-center text-2xl leading-5" :class="titleClasses">
          {{ title }}
        </div>
      </div>
    </template>
    <slot></slot>
  </a-modal>
</template>

<style lang="scss">
.base-modal {
  // .ant-modal-content {
  //   border-radius: 8px;
  //   @apply bg-primary;
  //   @apply text-white;
  //   .ant-modal-close {
  //     .ant-modal-close-icon {
  //       @apply text-white;
  //     }
  //   }
  // }
  .ant-modal-header {
    // @apply bg-primary;
    @apply border-none;
    // @apply pt-6;
    // @apply text-center normal-case;
    // border-radius: 8px 8px 0 0;
  }
  // .ant-modal-body {
  //   @apply p-8 pt-0;
  // }
}
</style>
