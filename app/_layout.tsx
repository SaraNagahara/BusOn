import { AuthProvider, useAuth } from "@/context/AuthProvider";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritosProvider } from "../context/FavoritosProvider";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import "./global.css";

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

// 🛡️ COMPONENTE GUARDIÃO DE ROTAS
function ProtetorDeRotas() {
  const { usuarioLogado } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
    // 📝 Adicione aqui as páginas que QUALQUER UM pode ver (deslogado)
    const rotasPublicas = [
      "", // 👈 Seu index.tsx (Tela de Boas-Vindas)
      "index", // 👈 Variação do index detectada pelo Expo
      "termosDeUso", // 👈 🚀 IMPORTANTE: Adicionado para o link clicar e abrir sem barrar!
      "inicial", // 👈 Sua Home (inicial.tsx)
      "loginCadastro", // 👈 Tela de Autenticação
      "notfound", // 👈 Destino de bloqueio
    ];

    // Pega o nome do segmento atual da URL do Expo Router
    const rotaAtual = segments[0] || "";

    // Se a rota não for pública e o usuário NÃO estiver logado...
    const ehRotaProtegida = !rotasPublicas.includes(rotaAtual);

    if (ehRotaProtegida && !usuarioLogado) {
      // 🛑 Bloqueia o acesso e joga direto para a tela de erro
      router.replace("/notfound");
    } else {
      // Libera o acesso para a página
      setVerificando(false);
    }
  }, [usuarioLogado, segments]);

  // Enquanto valida se tem sessão ativa, mostra uma tela de transição limpa
  if (verificando && !usuarioLogado) {
    return (
      <View className="flex-1 bg-[#F8FAFC] justify-center items-center">
        <ActivityIndicator size="large" color="#0040A1" />
      </View>
    );
  }

  // Se estiver tudo OK, renderiza o Stack normalmente
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <FavoritosProvider>
          {/* 🔐 O protetor precisa rodar aqui dentro para poder enxergar o useAuth() */}
          <ProtetorDeRotas />
        </FavoritosProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
