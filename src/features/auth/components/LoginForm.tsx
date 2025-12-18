import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import type { FC } from "react";

import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import type { LoginRequest } from "@/interfaces/auth.interface";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      setIsLoading(true);
      setError("");

      await login(data.email, data.password);
      navigate("/chat")
    } catch (error: any) {
      setError(error?.response?.data?.message || "Error of init session");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Iniciar Session
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        fullWidth
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        autoFocus
        {...register("email", {
          required: "El email es requerido",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      ></TextField>

      <TextField
        margin="normal"
        fullWidth
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        {...register("password", {
          required: "La contraseña es requerida",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      ></TextField>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading || !isValid}
      >
        {isLoading ? "Iniciado sesión" : "Iniciar Sesión"}
      </Button>

      <Button fullWidth variant="contained" onClick={() => navigate("/register")} disabled={isLoading}>
        ¿No tienes cuenta? Regístrate
      </Button>
    </Box>
  );
};

export default LoginForm;
