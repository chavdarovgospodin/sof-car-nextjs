'use client';

import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useIsMutating } from '@tanstack/react-query';

export default function AdminGlobalLoading() {
  const isMutating = useIsMutating({
    predicate: (mutation) => {
      const key = (mutation.options.mutationKey || []) as unknown as Array<
        string | number
      >;
      return Array.isArray(key) && key[0] === 'admin';
    },
  });

  const open = isMutating > 0;

  return (
    <Backdrop
      open={open}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
