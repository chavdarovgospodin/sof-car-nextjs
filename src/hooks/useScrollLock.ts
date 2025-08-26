import { useEffect } from 'react';

interface ExtendedBody extends HTMLElement {
  _originalOverflow?: string;
  _scrollLockTimeout?: NodeJS.Timeout;
}

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    const body = document.body as ExtendedBody;

    if (lock) {
      // Simple approach: just ensure scrollbar stays visible
      const originalOverflow = body.style.overflow;

      // Set a small timeout to override Material-UI's overflow change
      const timeout = setTimeout(() => {
        if (body.style.overflow === 'hidden') {
          body.style.overflow = 'scroll';
        }
      }, 50);

      // Store original for cleanup
      body._originalOverflow = originalOverflow;
      body._scrollLockTimeout = timeout;
    } else {
      // Cleanup
      if (body._scrollLockTimeout) {
        clearTimeout(body._scrollLockTimeout);
        delete body._scrollLockTimeout;
      }

      // Restore original overflow if we changed it
      if (body._originalOverflow !== undefined) {
        body.style.overflow = body._originalOverflow;
        delete body._originalOverflow;
      }
    }

    return () => {
      // Cleanup on unmount
      if (body._scrollLockTimeout) {
        clearTimeout(body._scrollLockTimeout);
        delete body._scrollLockTimeout;
      }

      if (body._originalOverflow !== undefined) {
        body.style.overflow = body._originalOverflow;
        delete body._originalOverflow;
      }
    };
  }, [lock]);
}
