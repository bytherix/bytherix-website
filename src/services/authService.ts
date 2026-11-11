import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() ?? "";

export const isAuthConfigured = (): boolean =>
  API_BASE_URL.length > 0;

export class AuthNotConfiguredError extends Error {
  constructor() {
    super(
      "Account services are not configured for this deployment. Please contact Bytherix directly.",
    );
    this.name = "AuthNotConfiguredError";
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

function assertConfigured() {
  if (!isAuthConfigured()) {
    throw new AuthNotConfiguredError();
  }
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  assertConfigured();

  const { data } = await api.post<AuthResponse>(
    "/auth/register",
    payload
  );

  return data;
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  assertConfigured();

  const { data } = await api.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return data;
};

export default api;
