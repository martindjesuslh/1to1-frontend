import axiosInstance from "@/lib/axios";
import type {
  Conversation,
  Message,
  SendMessageRequest,
  SendMessageResponse,
} from "@/interfaces/chat.interface";

export const chatService = {
  async sendMessage(data: SendMessageRequest): Promise<SendMessageResponse> {
    const response = await axiosInstance.post<SendMessageResponse>("/chat/send", data);
    return response.data;
  },

  async getHistory(conversationId: string) {
    const response = await axiosInstance.get<{
      conversationId: string;
      title: string;
      messages: Message[];
      totalMessages: number;
    }>(`/chat/history/${conversationId}`);
    return response.data;
  },

  async getConversations(): Promise<Conversation[]> {
    const response = await axiosInstance.get<Conversation[]>("/chat/conversations");
    return response.data;
  },

  async deleteConversation(conversationId: string): Promise<void> {
    await axiosInstance.delete(`/chat/conversations/${conversationId}`);
  },

  async updateTitle(conversationId: string, title: string): Promise<void> {
    await axiosInstance.patch(`/chat/conversations/${conversationId}/title`, { title });
  },
};
