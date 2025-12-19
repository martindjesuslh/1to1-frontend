export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  conversationId: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface SendMessageRequest {
  conversationId?: string;
  content: string;
}

export interface SendMessageResponse {
  conversation: {
    id: string;
    title: string;
  };
  userMessage: Message;
  botMessage: Message;
}

export interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string, conversationId?: string) => Promise<void>;
  loadConversationHistory: (conversationId: string) => Promise<void>;
  loadConversations: () => Promise<void>;
  createNewConversation: () => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  deleteConversation: (conversationId: string) => Promise<void>;
  updateConversationTitle: (conversationId: string, title: string) => Promise<void>;
}
