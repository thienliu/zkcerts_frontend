<script lang="ts" setup>
import { useDocuments, useConnectWallet } from "@/hooks";

const { getListDocuments, pagingConfig, loadingListDocuments, documentsList } =
  useDocuments();
const { address, accessToken } = useConnectWallet();
const init = () => {
  if (accessToken.value) {
    getListDocuments();
  }
};
init();

watch(accessToken, (val, prevVal) => {
  if (val && prevVal && val !== prevVal) {
    init();
  }
});
</script>

<template>
  <PageSection>
    <template #title> The Certificate List </template>
    <template #content>
      <div v-if="address">
        <CertCardsList v-if="!loadingListDocuments" />
        <div v-else class="flex justify-center">
          <LoadingDot class="mx-auto" />
        </div>
        <div class="flex justify-center">
          <a-pagination
            v-if="pagingConfig.total > 0"
            class="mt-10 mx-auto"
            v-model:current="pagingConfig.page"
            :total="pagingConfig.total"
            :pageSize="pagingConfig.limit"
            show-less-items
          />
        </div>
      </div>
      <PleaseConnectWallet v-else> </PleaseConnectWallet>
    </template>
  </PageSection>
</template>
