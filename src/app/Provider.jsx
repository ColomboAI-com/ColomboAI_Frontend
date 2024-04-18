'use client';

import { AuthContextProvider2 } from "@/AuthfireBaseContext/fireAuthContext";

export function Providers({ children }) {
  return (
    <AuthContextProvider2>
      {children}
    </AuthContextProvider2>
  );
}