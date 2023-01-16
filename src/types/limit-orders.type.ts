export enum OrderType {
  ETH_TO_TOKEN,
  TOKEN_TO_ETH,
  TOKEN_TO_TOKEN,
}

export enum UserOrderType {
  OPEN = "OPEN",
  EXECUTED = "EXECUTED",
}

export interface UserOrderParams {
  limit: number;
  offset: number;
  caller: string;
  status: UserOrderType;
}

export interface UserOrderItem {
  id: string;
  key: string;
  caller: string;
  owner: string | null;
  input_token: string;
  output_token: string;
  amount: string;
  min_return: string;
  module: string;
  witness: string;
  secret: string;
  vault: string;
  data: string;
  aux_data: any;
  order_data: string;
  bought: string;
  input_data: any;
  input_amount: string;
  status: string;
  tx_hash_created: string;
  tx_hash_executed: string | null;
  tx_hash_cancelled: string | null;
  tx_hash_submitted: string | null;
  signature: any;
  createdAt: string;
  updatedAt: string;
}

export interface UserOrderResponse {
  items: UserOrderItem[];
  limit: number;
  offset: number;
  next_offset: number;
  total: number;
}
