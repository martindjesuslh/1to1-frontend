import { create } from "zustand";
import { authService } from "../services/authService";

import type { AuthState, RegisterRequest } from "@/interfaces/auth.interface";

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: localStorage.getItem("access_token"),
  isAuthenticated: !!localStorage.getItem("access_token"),

  login: async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    localStorage.setItem("access_token", response.access_token);
    set({
      user: response.user,
      token: response.access_token,
      isAuthenticated: true,
    });
  },

  register: async (data: RegisterRequest) => {
    const response = await authService.register(data);
    localStorage.setItem("access_token", response.access_token);
    set({
      user: response.user,
      token: response.access_token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    authService.logout();
    set({ user: null, token: null, isAuthenticated: false });
  },

  setUser: user => {
    set({ user });
  },
}));
