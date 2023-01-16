<script lang="ts" setup>
import { useDocuments, useConnectWallet } from "@/hooks";
import { uriToUrl, toDateTime } from "@/utils";
import { compareAddress } from "@/services/blockchain";

const { getDocumentDetail, documentDetailById, FIELD_TO_VERIFY } =
  useDocuments();
const { address } = useConnectWallet();

const { t } = useI18n();

const fieldsToVerify = computed(() =>
  (documentDetailById.value?.fields || []).map((el) => {
    const keys = Object.keys(el);
    return keys.map((key) => {
      if (FIELD_TO_VERIFY.UNIVERSITY.includes(key)) {
        return {
          value: ["from_date", "to_date"].includes(key)
            ? toDateTime((el as any)[key], "DD/MM/YYYY")
            : (el as any)[key],
          ...el,
          title: t(`fields.${key}`),
        };
      }
    });
  })
);
const fieldsData = computed(() => documentDetailById.value?.fields || []);

getDocumentDetail();
</script>

<template>
  <div v-if="documentDetailById">
    <BaseCard class="basic-info !mb-8">
      <div class="text-xl font-bold mb-6">Author Info</div>
      <div class="basic-info__row">
        <div class="basic-info__row__title">Certificate name</div>
        <div class="basic-info__row__content">
          {{ documentDetailById.name }}
        </div>
      </div>
      <div class="basic-info__row">
        <div class="basic-info__row__title">Owner name</div>
        <div class="basic-info__row__content">
          {{ documentDetailById.owner_name }}
        </div>
      </div>
      <div class="basic-info__row">
        <div class="basic-info__row__title">Owner email</div>
        <div class="basic-info__row__content">
          {{ documentDetailById.owner_email }}
        </div>
      </div>
      <div class="basic-info__row">
        <div class="basic-info__row__title">Owner phone</div>
        <div class="basic-info__row__content">
          {{ documentDetailById.owner_phone }}
        </div>
      </div>
      <div class="basic-info__row">
        <div class="basic-info__row__title">Certificate image</div>
        <div class="basic-info__row__content">
          <img
            :src="uriToUrl(documentDetailById.token_uri)"
            alt=""
            class="w-20 h-auto object-contain"
          />
        </div>
      </div>
    </BaseCard>
    <BaseCard>
      <div class="text-xl font-bold mb-6">To verify info</div>

      <div v-for="(field, index) in fieldsToVerify" class="field-wrapper">
        <template v-for="item in field">
          <div v-if="item && item.title && item.value" class="field">
            <div class="field__title">{{ item?.title }}</div>
            <div class="field__content">{{ item?.value }}</div>
          </div>
        </template>
        <div
          v-if="compareAddress(address, fieldsData[index].sign_address)"
          class="flex justify-end mt-4"
        >
          <BaseButton variant="primary" class="!w-max px-10">Verify</BaseButton>
        </div>
      </div></BaseCard
    >
  </div>
  <a-empty v-else></a-empty>
</template>

<style lang="scss">
.basic-info {
  &__row {
    @apply flex-col sm:flex-row flex items-start justify-between mb-4 md:mb-2 flex-wrap;
    &__title {
      @apply font-semibold;
    }
    &__content {
      @apply font-bold text-base;
    }
  }
}

.field {
  @apply flex-col sm:flex-row flex items-start justify-between mb-4 md:mb-2 flex-wrap;
  &__title {
    @apply font-semibold;
  }
  &__content {
    @apply font-bold text-base;
  }
}

.field-wrapper {
  @apply border-b border-gray-300 py-4;
  &:last-child {
    @apply border-none;
  }
}
</style>
