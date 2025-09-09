'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SnackbarProvider } from '@/providers/SnackbarProvider';
import AdminGlobalLoading from '@/components/Admin/AdminGlobalLoading';
import { useAdmin } from '@/hooks/useAdmin';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminUser, isLoadingUser } = useAdmin(
    'none',
    pathname === '/admin/login'
  );

  useEffect(() => {
    // Skip redirect logic if we're still loading or on login page
    if (isLoadingUser || pathname === '/admin/login') {
      return;
    }

    // If user is not logged in and not on login page, redirect to login
    if (!adminUser?.logged_in && pathname !== '/admin/login') {
      router.push('/admin/login');
      return;
    }

    // If user is logged in and on login page, redirect to dashboard
    if (adminUser?.logged_in && pathname === '/admin/login') {
      router.push('/admin/dashboard');
      return;
    }

    // If user is logged in and on /admin (root), redirect to dashboard
    if (adminUser?.logged_in && pathname === '/admin') {
      router.push('/admin/dashboard');
      return;
    }
  }, [adminUser, isLoadingUser, pathname, router]);

  return (
    <div className="admin-layout">
      <SnackbarProvider>
        <AdminGlobalLoading />
        {children}
      </SnackbarProvider>
    </div>
  );
}
