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

import "./global.css";

export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
};

// Se estiver tudo OK, renderiza o Stack normalmente

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
