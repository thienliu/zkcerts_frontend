import { TOKENS_KEY } from "@/constants/config";
import type { AuthToken } from "@/types";

export const getLocalRefreshToken = () => {
  const localData = localStorage.getItem(TOKENS_KEY);
  const tokenData = localData ? JSON.parse(localData) : undefined;
  return tokenData?.refresh_token;
};

export const getLocalAccessToken = () => {
  const localData = localStorage.getItem(TOKENS_KEY);
  const tokenData = localData ? JSON.parse(localData) : undefined;
  return tokenData?.access_token;
};

export const getTokens = () => {
  const localData = localStorage.getItem(TOKENS_KEY);

  const tokenData = localData
    ? (JSON.parse(localData) as AuthToken)
    : undefined;

  return tokenData;
};

export const setTokens = (tokens: AuthToken) => {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
};

export const removeTokens = () => {
  localStorage.removeItem(TOKENS_KEY);
};
