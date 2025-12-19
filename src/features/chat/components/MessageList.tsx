import { useEffect, useRef } from "react";

import { Box, Paper, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";

import type { Message } from "@/interfaces/chat.interface";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
      {messages.map(message => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", maxWidth: "70%" }}>
            {message.sender === "bot" && (
              <Avatar sx={{ bgcolor: "primary.main", mr: 1 }}>
                <SmartToyIcon />
              </Avatar>
            )}
            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: message.sender === "user" ? "primary.main" : "grey.800", // Cambiar grey.100 a grey.800
                color: message.sender === "user" ? "white" : "text.primary",
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, mt: 0.5, display: "block" }}>
                {new Date(message.createdAt).toLocaleTimeString()}
              </Typography>
            </Paper>
            {message.sender === "user" && (
              <Avatar sx={{ bgcolor: "secondary.main", ml: 1 }}>
                <PersonIcon />
              </Avatar>
            )}
          </Box>
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default MessageList;
