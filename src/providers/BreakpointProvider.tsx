'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

interface BreakpointContextType {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
  isSmallMobile: boolean;
  // Additional useful breakpoints
  isLargeDesktop: boolean;
  isSmallTablet: boolean;
  // Current breakpoint name
  currentBreakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const BreakpointContext = createContext<BreakpointContextType | undefined>(
  undefined
);

interface BreakpointProviderProps {
  children: ReactNode;
}

export function BreakpointProvider({ children }: BreakpointProviderProps) {
  const theme = useTheme();

  // Material-UI breakpoints
  const isSm = useMediaQuery(theme.breakpoints.only('sm')); // 600-899px
  const isMd = useMediaQuery(theme.breakpoints.only('md')); // 900-1199px
  const isLg = useMediaQuery(theme.breakpoints.only('lg')); // 1200-1535px
  const isXl = useMediaQuery(theme.breakpoints.up('xl')); // 1536px+

  // Custom breakpoints for better control
  const isSmallMobile = useMediaQuery('(max-width: 480px)'); // Very small phones
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 900px
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); // 900-1199px
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); // >= 1200px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('xl')); // >= 1536px
  const isSmallTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600-899px

  // Determine current breakpoint
  const getCurrentBreakpoint = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    return 'xs';
  };

  const contextValue: BreakpointContextType = {
    isDesktop,
    isTablet,
    isMobile,
    isSmallMobile,
    isLargeDesktop,
    isSmallTablet,
    currentBreakpoint: getCurrentBreakpoint(),
  };

  return (
    <BreakpointContext.Provider value={contextValue}>
      {children}
    </BreakpointContext.Provider>
  );
}

export function useBreakpoint(): BreakpointContextType {
  const context = useContext(BreakpointContext);
  if (context === undefined) {
    throw new Error('useBreakpoint must be used within a BreakpointProvider');
  }
  return context;
}

// Hook for specific breakpoint checks (alternative API)
export function useBreakpointValue<T>(values: {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}): T | undefined {
  const { currentBreakpoint } = useBreakpoint();
  return values[currentBreakpoint];
}
