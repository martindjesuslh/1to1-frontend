import { Paper } from "@mui/material";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChatStore } from "../store/chatStore";

const ChatRoom = () => {
  const { messages, isLoading, sendMessage, currentConversation } = useChatStore();

  const handleSendMessage = async (message: string) => {
    await sendMessage(message, currentConversation?.id);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        mx: "auto",
      }}
    >
      <MessageList messages={messages} />
      <MessageInput onSend={handleSendMessage} disabled={isLoading} />
    </Paper>
  );
};

export default ChatRoom;
