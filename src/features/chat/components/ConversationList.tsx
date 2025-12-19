import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import type { Conversation } from "@/interfaces/chat.interface";
import { useState } from "react";

interface ConversationListProps {
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  conversations: Conversation[];
  currentConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
}

const ConversationList = (props: ConversationListProps) => {
  const { conversations, currentConversation, onNewConversation, onSelectConversation, onDelete, onEdit } =
    props;

  const [editDialog, setEditDialog] = useState<{ open: boolean; id: string; title: string }>({
    open: false,
    id: "",
    title: "",
  });

  const handleEditClick = (id: string, title: string) => {
    setEditDialog({ open: true, id, title });
  };

  const handleEditSave = () => {
    if (editDialog.title.trim()) {
      onEdit(editDialog.id, editDialog.title.trim());
      setEditDialog({ open: false, id: "", title: "" });
    }
  };

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
                primary={`${conversation.title}`}
                secondary={new Date(conversation.updatedAt).toLocaleDateString()}
              />
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={e => {
                    e.stopPropagation();
                    handleEditClick(conversation.id, conversation.title);
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(conversation.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </ListItemButton>
          ))
        )}
      </List>
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, id: "", title: "" })}>
        <DialogTitle>Editar título</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            value={editDialog.title}
            onChange={e => setEditDialog({ ...editDialog, title: e.target.value })}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, id: "", title: "" })}>Cancelar</Button>
          <Button onClick={handleEditSave} variant="contained">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConversationList;
