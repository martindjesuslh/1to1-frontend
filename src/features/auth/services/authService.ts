import axiosInstance from "@/lib/axios";

import type {
  MeResponse,
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
} from "@/interfaces/auth.interface";

export const authService = {
  async getUser(): Promise<MeResponse> {
    const response = await axiosInstance.get<MeResponse>("/auth/me");
    return response.data;
  },

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await axiosInstance.post<RegisterResponse>("/users/register", data);
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("access_token");
  },
};
