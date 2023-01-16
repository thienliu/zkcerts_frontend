<script lang="ts" setup>
import type { HTMLElementEvent } from "@/types";

defineProps({
  label: {
    type: String,
    default: "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  defaultChecked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["change"]);

const handleChange = (e: Event) => {
  const event = e as HTMLElementEvent<HTMLInputElement>;
  emit("change", event.target.checked);
};
</script>

<template>
  <label class="wrapper">
    <input
      :defaultChecked="!!defaultChecked"
      :checked="!!checked"
      @change="handleChange"
      type="checkbox"
    />
    <span>{{ label }}</span>
  </label>
</template>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  input {
    position: absolute;
    opacity: 0;
    & + span {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0;
      // @apply text-white;
      font-size: 14px;
    }
    & + span:before {
      content: "";
      margin-right: 10px;
      padding: 4px;
      display: inline-block;
      vertical-align: text-top;
      width: 24px;
      height: 24px;
      // background: var(--primary);
      border: 1.5px solid #8378ff;
      border-radius: 5px;
    }
    // Box hover
    &:hover + span:before {
      opacity: 0.5;
    }

    // Box focus
    &:focus + span:before {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
    }

    // Disabled state span.
    &:disabled + span {
      color: #b8b8b8;
      cursor: auto;
    }

    // Disabled box.
    &:disabled + span:before {
      box-shadow: none;
      background: #ddd;
    }

    // Checkmark. Could be replaced with an image
    &:checked + span:after {
      content: "";
      position: absolute;
      left: 3px;
      top: 3px;
      background: white;
      width: 18px;
      height: 18px;
      background: #8378ff;
      border-radius: 3px;
    }
  }
}
</style>
