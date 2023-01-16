import { createFetch, useOffsetPagination } from "@vueuse/core";
import type { UseFetchOptions } from "@vueuse/core";
import type { Ref } from "vue";
import qs from "qs";
import { API_BASE_URL } from "@/constants";
import { openNotification } from "./notification.hook";
import { NotificationType } from "@/types";

interface ApiError {
  message?: string;
  code?: string;
}

const useMyFetchApi = createFetch({
  baseUrl: API_BASE_URL,
  options: {
    timeout: 60000,
    onFetchError(ctx) {
      const error = JSON.parse(ctx.data) as ApiError;

      openNotification({
        type: NotificationType.ERROR,
        title: "Error",
        description: error.message || error,
      });
      return ctx;
    },
    afterFetch(ctx) {
      ctx.data = JSON.parse(ctx.data).data;
      return ctx;
    },
  },
  fetchOptions: {
    mode: "cors",
  },
});

export const fetchData = <P, R>({
  url,
  params,
  fetchOptions,
}: {
  url: string;
  params: Ref<P>;
  fetchOptions?: UseFetchOptions;
}) => {
  const stringifiedUrl = computed(() => `${url}?${qs.stringify(params.value)}`);
  const options: UseFetchOptions = {
    ...(fetchOptions || {}),
    refetch: true,
  };
  const data = useMyFetchApi<R>(stringifiedUrl, options);

  return {
    ...data,
  };
};
