import { Container, Typography, Button, Box } from "@mui/material";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useNavigate } from "react-router-dom";

export const ChatPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">Chat</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Box>

      <Typography variant="body1">
        Bienvenido, {user?.name}! ({user?.email})
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Esta es la página del chat. Próximamente implementaremos la funcionalidad completa.
      </Typography>
    </Container>
  );
};
