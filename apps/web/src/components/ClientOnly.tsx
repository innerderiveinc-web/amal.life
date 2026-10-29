import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ClientOnly wrapper component:
 * Guarantees 0% React hydration mismatch errors by rendering the identical fallback on the server
 * and during initial client hydration, then safely mounting client-specific widgets.
 * Eliminates fragile next/dynamic chunk-loading crashes (require.e is not a function).
 */
export const ClientOnly: React.FC<ClientOnlyProps> = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ClientOnly;
