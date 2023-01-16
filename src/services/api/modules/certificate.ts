import api from "../index";
import { API_V1_PREFIX } from "@/constants";
import type { DocumentItem, DocumentStatus } from "@/types";

export const fetchDocuments = async ({
  status,
  offset = 0,
  limit = 10,
}: {
  status: DocumentStatus;
  offset?: number;
  limit?: number;
}) => {
  const { data } = await api.get(`${API_V1_PREFIX}/documents`, {
    status,
    offset,
    limit,
  });
  return data as {
    items: DocumentItem[];
    total: number;
  };
};

export const fetchDocumentDetail = async (id: string) => {
  const { data } = await api.get(`${API_V1_PREFIX}/documents/${id}`);
  return data as DocumentItem;
};
