<script lang="ts" setup>
import type { DocumentItem } from "@/types";
import type { PropType } from "vue";
import { toDateTime, uriToUrl } from "@/utils";

const props = defineProps({
  item: {
    type: Object as PropType<DocumentItem>,
    default: null,
  },
});

const university = computed(() => props.item.fields[0].title);
const field = computed(() => props.item.fields[0]);
const itemCert = computed(() => uriToUrl(props.item.token_uri));
</script>

<template>
  <BaseCard v-if="item" class="cert-card" @click="$router.push('/detail/1')">
    <div class="w-full h-150px">
      <img :src="itemCert" alt="Certificate" class="h-full object-cover" />
    </div>
    <div class="cert-card__content">
      <div class="cert-card__content__title">{{ item.name }}</div>
      <div class="cert-card__content__name">{{ item.owner_name }}</div>
      <div class="cert-card__content__school">{{ university }}</div>
      <div class="cert-card__content__date">
        {{ toDateTime(field.from_date, "YYYY") }} -
        {{ toDateTime(field.to_date, "YYYY") }}
      </div>
      <BaseButton
        link
        :to="`/detail/${item.id}`"
        variant="primary"
        class="mt-4 hover:text-white"
        >Detail</BaseButton
      >
    </div>
  </BaseCard>
</template>

<style lang="scss">
.cert-card {
  @apply cursor-pointer;
  &__content {
    @apply text-sm font-medium;
    @apply mt-4;
    &__title {
      @apply font-bold text-base;
    }
  }
}
</style>
