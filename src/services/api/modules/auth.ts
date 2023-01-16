import api from "../index";
import type { GetTokenGrantType, AuthToken } from "@/types";
import { API_V1_PREFIX } from "@/constants";

export const getNonce = async (address: string) => {
  const { data } = await api.get(`${API_V1_PREFIX}/authentication/nonce`, {
    address,
  });
  return data;
};

export const getTokens = async ({
  address,
  signature,
  grantType,
  refreshToken,
}: {
  address: string;
  signature?: string;
  grantType: GetTokenGrantType;
  refreshToken?: string;
}) => {
  const { data } = await api.post(`${API_V1_PREFIX}/authentication/token`, {
    grant_type: grantType,
    refresh_token: refreshToken,
    address,
    signature,
  });
  return data as AuthToken;
};
