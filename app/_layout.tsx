import { AuthProvider } from "@/context/AuthProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavoritosProvider } from "../context/FavoritosProvider";

import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

{
  /*estilos da fonte para serem usadas */
}

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

import "./global.css";

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
      {/* 👈 ENVOLVEU TODO O APP: Salva os favoritos ao mudar de página pelo footer */}
      <AuthProvider>
        <FavoritosProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </FavoritosProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
