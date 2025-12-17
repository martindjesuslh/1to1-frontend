import axiosInstance from "@/lib/axios";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/interfaces/auth.interface";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem("access_token");
  },
};
