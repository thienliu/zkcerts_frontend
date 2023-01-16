export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export enum CategoryType {
    University = 'UNIVERSITY'
}