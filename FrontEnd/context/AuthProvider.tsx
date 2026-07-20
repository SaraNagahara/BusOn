// context/AuthProvider.tsx
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  usuarioLogado: boolean;
  setUsuarioLogado: (logado: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuarioLogado, setUsuarioLogado] = useState(true); // 🔐 Único ponto de verdade do login

  return (
    <AuthContext.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}
