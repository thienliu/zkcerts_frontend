import { API_LIMIT } from "@/constants";
import type { DocumentItem } from "@/types";
import { DocumentStatus, CategoryType } from "@/types";

import { useApiCall } from "./promise-call.hook";
import {
  fetchDocuments,
  fetchDocumentDetail,
} from "@/services/api/modules/certificate";

const documentDetailMap = reactive(new Map<string, DocumentItem>());
const documentsList = ref<DocumentItem[]>([]);
const pagingConfig = reactive({
  page: 1,
  limit: API_LIMIT,
  total: 0,
  status: DocumentStatus.ALL,
});
const offset = computed(() => (pagingConfig.page - 1) * pagingConfig.limit);
const FIELD_TO_VERIFY = {
  [CategoryType.University]: [
    "from_date",
    "grade",
    "point",
    "title",
    "to_date",
    "type",
  ],
};

export const useDocuments = () => {
  const route = useRoute();

  const documentId = computed(() => route.params.id as string);

  const { handleCall: getListDocuments, loading: loadingListDocuments } =
    useApiCall({
      call: async () => {
        const data = await fetchDocuments({
          status: pagingConfig.status,
          offset: offset.value,
          limit: pagingConfig.limit,
        });
        documentsList.value = [...data.items];
        pagingConfig.total = data.total;
      },
      loadingKey: "loading_document_list",
    });
  const { handleCall: getDocumentDetail, loading: loadingDocumentDetail } =
    useApiCall({
      call: async () => {
        const data = await fetchDocumentDetail(documentId.value);
        documentDetailMap.set(documentId.value, data);
      },
      loadingKey: "loading_document_detail",
    });
  const documentDetailById = computed(() =>
    documentDetailMap.get(documentId.value)
  );
  return {
    getListDocuments,
    loadingListDocuments,
    documentsList,
    pagingConfig,
    getDocumentDetail,
    loadingDocumentDetail,
    documentDetailById,
    FIELD_TO_VERIFY,
  };
};
