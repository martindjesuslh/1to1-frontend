import { List, ListItemButton, ListItemText, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { Conversation } from "@/interfaces/chat.interface";

interface ConversationListProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
}

const ConversationList = ({
  conversations,
  currentConversation,
  onSelectConversation,
  onNewConversation,
}: ConversationListProps) => {
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Conversaciones</Typography>
        <IconButton onClick={onNewConversation} color="primary" size="small">
          <AddIcon />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1, overflow: "auto" }}>
        {conversations.length === 0 ? (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No hay conversaciones
            </Typography>
          </Box>
        ) : (
          conversations.map(conversation => (
            <ListItemButton
              key={conversation.id}
              selected={currentConversation?.id === conversation.id}
              onClick={() => onSelectConversation(conversation)}
            >
              <ListItemText
                primary={`Conversación ${conversation.id.slice(0, 8)}`}
                secondary={new Date(conversation.updatedAt).toLocaleDateString()}
              />
            </ListItemButton>
          ))
        )}
      </List>
    </Box>
  );
};

export default ConversationList;
