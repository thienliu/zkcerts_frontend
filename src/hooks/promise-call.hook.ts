import { useToast } from "vue-toastification";
import {
  getTokens as getLocalStorageTokens,
  setTokens,
} from "@/services/localstorage/token";
import { getTokens } from "@/services/api/modules/auth";
import { GetTokenGrantType } from "@/types";

const promiseLoadingMap = reactive(new Map<string, boolean>());
const isAlreadyFetchingAccessToken = ref(false);
const subscriber = ref<Function[]>([]);

export const usePromiseCall = <P, R>({
  call,
  successMessage,
  loadingKey,
  errorMessage,
  errorCallback,
  loadingCondition = () => true,
}: {
  call: (args?: P) => Promise<R>;
  loadingKey: string;
  successMessage?: string;
  errorMessage?: string;
  errorCallback?: () => void;
  loadingCondition?: () => boolean;
}) => {
  const toast = useToast();
  const shouldLoading = computed(() => loadingCondition());
  const handleCall = async (params?: P) => {
    const caller = async () => {
      if (params) {
        return await call(params);
      }
      return await call();
    };
    try {
      if (shouldLoading.value) {
        promiseLoadingMap.set(loadingKey, true);
      }
      const result = await caller();
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (error: any) {
      console.error(error);
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error(error.message ?? error);
      }
      if (errorCallback) {
        errorCallback();
      }
    } finally {
      promiseLoadingMap.set(loadingKey, false);
    }
  };
  const loading = computed(() => promiseLoadingMap.get(loadingKey));
  return {
    handleCall,
    loading,
  };
};

export const useApiCall = <P, R>({
  call,
  successMessage,
  loadingKey,
  errorMessage,
  errorCallback,
  loadingCondition = () => true,
}: {
  call: (args?: P) => Promise<R>;
  loadingKey: string;
  successMessage?: string;
  errorMessage?: string;
  errorCallback?: () => void;
  loadingCondition?: () => boolean;
}) => {
  const toast = useToast();
  const shouldLoading = computed(() => loadingCondition());
  const handleCall = async (params?: P) => {
    const caller = async () => {
      if (params) {
        return await call(params);
      }
      return await call();
    };
    try {
      if (shouldLoading.value) {
        promiseLoadingMap.set(loadingKey, true);
      }
      const result = await caller();
      if (successMessage) {
        toast.success(successMessage);
      }
      return result;
    } catch (error: any) {
      console.error(error);
      if (error.status === 401) {
        const tokens = getLocalStorageTokens();
        if (tokens && tokens.refresh_token) {
          if (!isAlreadyFetchingAccessToken.value) {
            isAlreadyFetchingAccessToken.value = true;

            getTokens({
              address: tokens.user.address,
              grantType: GetTokenGrantType.refresh_token,
              refreshToken: tokens.refresh_token,
            })
              .then(async (tokens) => {
                console.debug({ tokens });
                isAlreadyFetchingAccessToken.value = false;
                setTokens(tokens);
                const result = await caller();
                const mappedSubscribers = [...subscriber.value];
                mappedSubscribers.forEach((callback) => callback());
                subscriber.value = [];
                if (successMessage) {
                  toast.success(successMessage);
                }
                return result;
              })
              .catch(() => {
                toast.error(error.message ?? error);
              });
          } else {
            subscriber.value.push(caller);
          }
        } else {
          toast.error(error.message ?? error);
        }
        return;
      }
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error(error.message ?? error);
      }
      if (errorCallback) {
        errorCallback();
      }
    } finally {
      promiseLoadingMap.set(loadingKey, false);
    }
  };
  const loading = computed(() => promiseLoadingMap.get(loadingKey));
  return {
    handleCall,
    loading,
  };
};
