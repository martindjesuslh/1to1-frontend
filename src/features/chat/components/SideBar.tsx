import { useEffect } from "react";
import { Drawer, Box, useMediaQuery, useTheme } from "@mui/material";

import { useChatStore } from "../store/chatStore";
import ConversationList from "./ConversationList";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    conversations,
    currentConversation,
    setCurrentConversation,
    createNewConversation,
    loadConversations,
    deleteConversation,
    updateConversationTitle,
  } = useChatStore();

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? open : true}
      onClose={onClose}
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          ...(isMobile ? {} : { position: "relative" }),
        },
      }}
    >
      <Box sx={{ height: "100%", overflow: "hidden" }}>
        <ConversationList
          conversations={conversations}
          currentConversation={currentConversation}
          onSelectConversation={setCurrentConversation}
          onNewConversation={createNewConversation}
          onDelete={deleteConversation}
          onEdit={updateConversationTitle}
        />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
