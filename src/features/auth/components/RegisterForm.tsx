import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import type { RegisterRequest } from "@/interfaces/auth.interface";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const register_action = useAuthStore(state => state.register);

  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<RegisterRequest & { confirmPassword: string }>();

  const password = watch("password");

  const onSubmit = async (data: RegisterRequest & { confirmPassword: string }) => {
    try {
      setIsLoading(true);
      setError("");

      const { confirmPassword: _, ...registerData } = data;
      await register_action(registerData);

      navigate("/chat");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        Registro
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        margin="normal"
        fullWidth
        label="Nombre"
        autoComplete="name"
        autoFocus
        {...register("name", {
          required: "El nombre es requerido",
          minLength: {
            value: 2,
            message: "El nombre debe tener al menos 2 caracteres",
          },
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Email"
        autoComplete="email"
        {...register("email", {
          required: "El email es requerido",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        {...register("password", {
          required: "La contraseña es requerida",
          minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        margin="normal"
        fullWidth
        label="Confirmar Contraseña"
        type="password"
        autoComplete="new-password"
        {...register("confirmPassword", {
          required: "Debes confirmar la contraseña",
          validate: value => value === password || "Las contraseñas no coinciden",
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading || !isLoading}
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </Button>

      <Button fullWidth variant="text" onClick={() => navigate("/login")}>
        ¿Ya tienes cuenta? Inicia sesión
      </Button>
    </Box>
  );
};
