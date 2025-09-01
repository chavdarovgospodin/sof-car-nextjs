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
  const { login, adminUser, isLoggingIn } = useAdmin();
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

          {(errors.username || errors.password) && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.username || errors.password || texts.error}
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
