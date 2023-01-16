export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user: {
    address: string;
    id: string;
  };
}

export enum GetTokenGrantType {
  signature = "signature",
  refresh_token = "refresh_token",
}
