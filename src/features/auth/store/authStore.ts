import { create } from "zustand";
import { authService } from "../services/authService";

import type { AuthState, RegisterRequest } from "@/interfaces/auth.interface";

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: localStorage.getItem("access_token"),
  isAuthenticated: !!localStorage.getItem("access_token"),

  checkAuth: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null });
      return;
    }

    try {
      const { email, name } = await authService.getUser();
      set({
        user: { email, name },
        token,
        isAuthenticated: true,
      });
    } catch {
      localStorage.removeItem("access_token");
      set({ isAuthenticated: false, user: null, token: null });
    }
  },

  login: async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    localStorage.setItem("access_token", response.accessToken);

    set({
      user: response.user,
      token: response.accessToken,
      isAuthenticated: true,
    });
  },

  register: async (data: RegisterRequest) => {
    await authService.register(data);
    const { accessToken, user } = await authService.login({ email: data.email, password: data.password });
    localStorage.setItem("access_token", accessToken);

    set({
      user,
      token: accessToken,
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
