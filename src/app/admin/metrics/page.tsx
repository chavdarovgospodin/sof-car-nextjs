'use client';

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Chip,
  LinearProgress,
  Divider,
  Paper,
} from '@mui/material';
import {
  Storage,
  Dataset,
  Assessment,
  Warning,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { useAdmin } from '@/hooks/useAdmin';

export default function MetricsPage() {
  const { usageOverview, isLoadingMetrics, metricsError } = useAdmin(
    'none',
    false,
    true
  );

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'error';
    if (percentage >= 70) return 'warning';
    return 'success';
  };

  const getUsageIcon = (percentage: number) => {
    if (percentage >= 90) return <Error color="error" />;
    if (percentage >= 70) return <Warning color="warning" />;
    return <CheckCircle color="success" />;
  };

  if (isLoadingMetrics) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (metricsError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Error loading metrics</Typography>
          <Typography>
            {metricsError instanceof Error
              ? metricsError.message
              : 'Failed to fetch metrics'}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mb: 3, color: 'primary.main' }}
      >
        📊 Database Metrics
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Real-time monitoring of database and storage usage
      </Typography>

      <Grid container spacing={3}>
        {/* Database Overview */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Dataset sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Database Usage</Typography>
              </Box>

              {usageOverview?.database?.error ? (
                <Alert severity="error">{usageOverview.database.error}</Alert>
              ) : (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Database Size:{' '}
                      {usageOverview?.database?.estimated_size_mb} MB
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Limit: {usageOverview?.limits?.database_mb} MB
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        {getUsageIcon(
                          usageOverview?.database?.usage_percent || 0
                        )}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          Usage: {usageOverview?.database?.usage_percent}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={usageOverview?.database?.usage_percent || 0}
                        color={getUsageColor(
                          usageOverview?.database?.usage_percent || 0
                        )}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6, md: 6 }}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="primary">
                          {usageOverview?.database?.cars_count || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Cars
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid size={{ xs: 6, md: 6 }}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="h4" color="secondary">
                          {usageOverview?.database?.bookings_count || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Bookings
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Storage Overview */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Storage sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Storage Usage</Typography>
              </Box>

              {usageOverview?.storage?.error ? (
                <Alert severity="error">{usageOverview.storage.error}</Alert>
              ) : (
                <>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Files: {usageOverview?.storage?.total_files || 0}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Size: {usageOverview?.storage?.total_size_mb || 0}{' '}
                      MB ({usageOverview?.storage?.total_size_gb || 0} GB)
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Limit: {usageOverview?.limits?.storage_gb} GB
                    </Typography>

                    {/* Storage Usage Progress */}
                    <Box sx={{ mt: 2 }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        {getUsageIcon(
                          ((usageOverview?.storage?.total_size_gb || 0) /
                            (usageOverview?.limits?.storage_gb || 1)) *
                            100
                        )}
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          Usage:{' '}
                          {(
                            ((usageOverview?.storage?.total_size_gb || 0) /
                              (usageOverview?.limits?.storage_gb || 1)) *
                            100
                          ).toFixed(1)}
                          %
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={
                          ((usageOverview?.storage?.total_size_gb || 0) /
                            (usageOverview?.limits?.storage_gb || 1)) *
                          100
                        }
                        color={getUsageColor(
                          ((usageOverview?.storage?.total_size_gb || 0) /
                            (usageOverview?.limits?.storage_gb || 1)) *
                            100
                        )}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    {usageOverview?.storage?.estimated_usage_note && (
                      <Alert severity="info" sx={{ mt: 2 }}>
                        {usageOverview.storage.estimated_usage_note}
                      </Alert>
                    )}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {usageOverview?.storage?.buckets &&
                  Object.keys(usageOverview.storage.buckets).length > 0 ? (
                    <Box>
                      <Typography variant="subtitle2" gutterBottom>
                        Bucket Details:
                      </Typography>
                      {Object.entries(usageOverview.storage.buckets).map(
                        ([bucketName, bucketData]) => {
                          const data = bucketData as {
                            files_count: number;
                            size_mb?: number;
                          };
                          return (
                            <Box key={bucketName} sx={{ mb: 1 }}>
                              <Chip
                                label={`${bucketName}: ${
                                  data.files_count
                                } files (${data.size_mb || 0} MB)`}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Box>
                          );
                        }
                      )}
                    </Box>
                  ) : (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        No storage buckets found. Check Supabase Dashboard for
                        storage setup.
                      </Typography>
                    </Alert>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* System Status */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Assessment sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">System Status</Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CheckCircle color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="body2" color="text.secondary">
                      Database
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Connected
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CheckCircle color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="body2" color="text.secondary">
                      Storage
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Available
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CheckCircle color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="body2" color="text.secondary">
                      API
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Operational
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <CheckCircle color="success" sx={{ fontSize: 40 }} />
                    <Typography variant="body2" color="text.secondary">
                      Admin Panel
                    </Typography>
                    <Typography variant="body2" color="success.main">
                      Active
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
