import api from "../index";
import { API_V1_PREFIX } from "@/constants";
import type { CategoryItem } from "@/types";

export const fetchCategories = async () => {
  const { data } = await api.get(`${API_V1_PREFIX}/categories`);
  return data as CategoryItem[];
};
