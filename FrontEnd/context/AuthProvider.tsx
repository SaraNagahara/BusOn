// context/AuthProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserProps {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  usuarioLogado: boolean;
  user: UserProps | null;
  token: string | null;
  salvarSessao: (token: string, user: UserProps) => Promise<void>;
  encerrarSessao: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProps | null>(null);

  // 🔒 Derivado do token: se tem token, usuarioLogado é true
  const usuarioLogado = Boolean(token && token.length > 0);

  // Carrega os dados salvos do AsyncStorage assim que o app inicia
  useEffect(() => {
    async function carregarSessao() {
      try {
        const tokenSalvo = await AsyncStorage.getItem("@token");
        const userSalvo = await AsyncStorage.getItem("@user");

        if (tokenSalvo && userSalvo) {
          setToken(tokenSalvo);
          setUser(JSON.parse(userSalvo));
        }
      } catch (error) {
        console.error("Erro ao carregar sessão do storage:", error);
      }
    }

    carregarSessao();
  }, []);

  // Guardar no AsyncStorage e atualizar estados locais
  const salvarSessao = async (novoToken: string, dadosUsuario: UserProps) => {
    try {
      await AsyncStorage.setItem("@token", novoToken);
      await AsyncStorage.setItem("@user", JSON.stringify(dadosUsuario));

      setToken(novoToken);
      setUser(dadosUsuario);
    } catch (error) {
      console.error("Erro ao salvar sessão:", error);
    }
  };

  // Limpar sessão
  const encerrarSessao = async () => {
    try {
      await AsyncStorage.removeItem("@token");
      await AsyncStorage.removeItem("@user");

      setToken(null);
      setUser(null);
    } catch (error) {
      console.error("Erro ao encerrar sessão:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioLogado,
        user,
        token,
        salvarSessao,
        encerrarSessao,
      }}
    >
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
