export interface FieldToVerifyItem {
  id: string;
  document_id: string;
  university_id: string;
  title: string;
  from_date: string;
  to_date: string;
  type: string;
  grade: string;
  point: string;
  hash: string;
  sign_address: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
  documentId: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  owner_address: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  owner_birthday: string;
  token_id: string;
  token_uri: string;
  hash: string;
  min_field_verify: number;
  verified: boolean;
  created_at: string;
  updated_at: string;
  fields: FieldToVerifyItem[];
}

export enum DocumentStatus {
  Pending = "PENDING",
  Verified = "VERIFIED",
  ALL = "ALL",
}
export interface UniversityItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  established_date: string;
  slogan: string;
  wallet_address: string;
  order_index: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}
