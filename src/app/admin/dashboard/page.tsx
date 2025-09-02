'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button,
} from '@mui/material';
import { Logout, DirectionsCar, BookOnline } from '@mui/icons-material';
import BookingsTab from '@/components/Admin/BookingsTab';
import CarsTab from '@/components/Admin/CarsTab';
import { useAdmin } from '@/hooks/useAdmin';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboardPage() {
  const texts = {
    title: 'Админ Панел',
    profile: 'Профил',
    logout: 'Изход',
    bookings: 'Резервации',
    cars: 'Автомобили',
  };
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const { adminUser, logout, isLoadingUser } = useAdmin(
    tabValue === 0 ? 'bookings' : 'cars'
  );

  useEffect(() => {
    // Redirect to login if not logged in
    if (!isLoadingUser && !adminUser) {
      router.push('/admin/login');
    }
  }, [adminUser, isLoadingUser, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (isLoadingUser || !adminUser) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h6">Зареждане...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => logout()}
            startIcon={<Logout />}
          >
            {texts.logout}
          </Button>
        </Box>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom color="black">
            {texts.title}
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper elevation={1} sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="admin tabs"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab
              icon={<BookOnline />}
              label={texts.bookings}
              id="admin-tab-0"
              aria-controls="admin-tabpanel-0"
            />
            <Tab
              icon={<DirectionsCar />}
              label={texts.cars}
              id="admin-tab-1"
              aria-controls="admin-tabpanel-1"
            />
          </Tabs>
        </Paper>

        {/* Tab Panels */}
        <TabPanel value={tabValue} index={0}>
          <BookingsTab />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <CarsTab />
        </TabPanel>
      </Container>
    </Box>
  );
}
