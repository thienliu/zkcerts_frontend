import api from "../index";
import { API_V1_PREFIX } from "@/constants";
import type { UniversityItem } from "@/types";

export const fetchUniversities = async () => {
  const { data } = await api.get(`${API_V1_PREFIX}/universities`);
  return data as UniversityItem[];
};
