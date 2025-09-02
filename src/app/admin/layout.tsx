'use client';

import { SnackbarProvider } from '@/components/HomePage/SnackbarProvider';
import AdminGlobalLoading from '@/components/Admin/AdminGlobalLoading';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <SnackbarProvider>
        <AdminGlobalLoading />
        {children}
      </SnackbarProvider>
    </div>
  );
}
