import { create } from "zustand";

import type { ChatState } from "@/interfaces/chat.interface";
import { chatService } from "../services/chatService";

export const useChatStore = create<ChatState>((set, get) => ({
  conversations: [],
  currentConversation: null,
  messages: [],
  isLoading: false,
  error: null,

  sendMessage: async (message: string, conversationId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await chatService.sendMessage({
        content: message,
        conversationId,
      });

      set(state => ({
        ...state,
        messages: [...state.messages, response.userMessage, response.botMessage],
        currentConversation: state.currentConversation || {
          id: response.conversation.id,
          title: response.conversation.title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Error al enviar mensaje",
        isLoading: false,
      });
    }
  },

  loadConversations: async () => {
    set({ isLoading: true, error: null });
    try {
      const conversations = await chatService.getConversations();
      set({ conversations, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Error al cargar conversaciones",
        isLoading: false,
      });
    }
  },

  loadConversationHistory: async (conversationId: string) => {
    set({ isLoading: true, error: null });
    try {
      const history = await chatService.getHistory(conversationId);
      set({ messages: history.messages, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Error al cargar historial",
        isLoading: false,
      });
    }
  },

  deleteConversation: async (conversationId: string) => {
    try {
      await chatService.deleteConversation(conversationId);
      set(state => ({
        conversations: state.conversations.filter(c => c.id !== conversationId),
        currentConversation:
          state.currentConversation?.id === conversationId ? null : state.currentConversation,
        messages: state.currentConversation?.id === conversationId ? [] : state.messages,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error al eliminar conversación" });
    }
  },

  updateConversationTitle: async (conversationId: string, title: string) => {
    try {
      await chatService.updateTitle(conversationId, title);
      set(state => ({
        conversations: state.conversations.map(c => (c.id === conversationId ? { ...c, title } : c)),
        currentConversation:
          state.currentConversation?.id === conversationId
            ? { ...state.currentConversation, title }
            : state.currentConversation,
      }));
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error al actualizar título" });
    }
  },

  createNewConversation: () => {
    set({ currentConversation: null, messages: [] });
  },

  setCurrentConversation: conversation => {
    set({ currentConversation: conversation, messages: [] });
    if (conversation) {
      get().loadConversationHistory(conversation.id);
    }
  },
}));
