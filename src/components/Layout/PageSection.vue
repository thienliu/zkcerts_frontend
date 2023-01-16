<template>
  <div class="page-section">
    <div class="page-section__title">
      <slot name="title"></slot>
    </div>
    <div class="page-section-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.page-section {
  @apply mt-4;
  &__title {
    @apply text-transparent uppercase;
    @apply text-4xl font-bold;
    @apply mb-12 text-center;
    -webkit-background-clip: text;
    background-clip: text;
    background-image: linear-gradient(to right bottom, #631a93, #e7a7b2);
  }
}
</style>
