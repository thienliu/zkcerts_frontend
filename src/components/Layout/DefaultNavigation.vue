<script setup lang="ts"></script>

<template>
  <ul class="base-navigation"></ul>
</template>

<style lang="scss">
.base-navigation {
  @apply flex items-center flex-col xl:flex-row;
  // @apply text-white;
  @apply font-bold;
  @apply text-xl;
  &__item {
    @apply mr-0 mb-4 xl:mb-0 xl:mr-10;
    a {
    }
    &:last-child {
      @apply mr-0;
    }
  }
}
</style>
