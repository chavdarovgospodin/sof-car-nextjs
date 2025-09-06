'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, Login } from '@mui/icons-material';
import { useAdmin } from '@/hooks/useAdmin';
import axios from 'axios';

export default function AdminLoginPage() {
  // Директни български текстове за админ панела
  const texts = {
    title: 'Админ Панел',
    username: 'Потребителско име',
    password: 'Парола',
    login: 'Вход',
    loggingIn: 'Влизане...',
    error: 'Грешка при влизане',
    invalidCredentials: 'Невалидни потребителско име или парола',
  };

  const router = useRouter();
  const { login, adminUser, isLoggingIn, loginError } = useAdmin('none', true); // Skip status check on login page
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      // Clear error when user types
      if (errors.username || errors.password) {
        setErrors({ username: '', password: '' });
      }
    };

  // Clear login error when user starts typing
  useEffect(() => {
    if (loginError && (formData.username || formData.password)) {
      // This will be handled by the mutation reset
    }
  }, [formData.username, formData.password, loginError]);

  // Get error message from login error
  const getErrorMessage = () => {
    if (loginError) {
      // Check if it's an axios error with response
      if (
        axios.isAxiosError(loginError) &&
        loginError.response?.status === 401
      ) {
        return texts.invalidCredentials;
      }
      return loginError.message || texts.error;
    }
    if (errors.username || errors.password) {
      return errors.username || errors.password;
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    login(formData);
  };

  // Handle successful login - redirect when adminUser is set
  useEffect(() => {
    if (adminUser) {
      router.push('/admin/dashboard');
    }
  }, [adminUser, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {texts.title}
            </Typography>
          </Box>

          {getErrorMessage() && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {getErrorMessage()}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={texts.username}
              value={formData.username}
              onChange={handleInputChange('username')}
              margin="normal"
              required
              autoComplete="username"
              autoFocus
            />

            <TextField
              fullWidth
              label={texts.password}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange('password')}
              margin="normal"
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoggingIn || !formData.username || !formData.password}
              startIcon={<Login />}
              sx={{ mt: 3, mb: 2 }}
            >
              {isLoggingIn ? texts.loggingIn : texts.login}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
