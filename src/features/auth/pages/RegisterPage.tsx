import { Container, Paper, Box } from "@mui/material";

import { RegisterForm } from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <RegisterForm />
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
