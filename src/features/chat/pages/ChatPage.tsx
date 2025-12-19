import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuthStore } from "@/features/auth/store/authStore";
import ChatRoom from "../components/ChatRoom";
import Sidebar from "../components/SideBar";

const ChatPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setSidebarOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
            <Box>
              <Typography variant="h5">Chat de Ventas AI</Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.name} ({user?.email})
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
          <ChatRoom />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
