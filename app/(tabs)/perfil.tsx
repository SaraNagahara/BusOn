import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Perfil() {
  const router = useRouter();

  // Gerenciamento de rotas do Footer para a página de Perfil
  const handleNavegacaoFooter = (aba: TabOpcoes) => {
    if (aba === "home") {
      // Ajuste aqui para "/" se o seu arquivo principal for o index.tsx
      router.push("/inicial");
    }
    if (aba === "favoritas") {
      router.push("/favoritos");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-800 text-lg">Perfil do Usuário</Text>
        </View>

        {/* Rodapé com a indicação visual fixa na aba "perfil" */}
        <MenuFooter abaAtiva="perfil" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
