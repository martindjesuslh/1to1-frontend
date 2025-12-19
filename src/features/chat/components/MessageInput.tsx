import { useState } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSend, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          disabled={disabled}
          autoComplete="off"
        />
        <IconButton type="submit" color="primary" disabled={!message.trim() || disabled}>
          {disabled ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageInput;
