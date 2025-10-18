// components/providers/auth-provider.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth-store';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrate = useAuthStore((state) => state.hydrate);

  useEffect(() => {
    // Hidratar el estado desde localStorage cuando la app carga
    hydrate();
  }, [hydrate]);

  return <>{children}</>;
}