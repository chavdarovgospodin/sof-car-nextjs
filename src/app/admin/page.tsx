'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // This page will be handled by the layout redirect logic
    // But we can also add a fallback redirect here
    router.push('/admin/dashboard');
  }, [router]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        Пренасочване към админ панела...
      </Typography>
    </Box>
  );
}
