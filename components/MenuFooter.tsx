import { Ionicons } from "@expo/vector-icons";
import { memo } from "react"; // ⚡ Importado memo para travar re-renders desnecessários
import { Platform, Pressable, Text, View } from "react-native";
import { fonts } from "../app/_layout";

export type TabOpcoes = "home" | "favoritas" | "perfil";

interface MenuFooterProps {
  abaAtiva: TabOpcoes;
  aoMudarAba: (aba: TabOpcoes) => void;
}

// ⚡ Usamos o memo() envolvendo a função para garantir ganho de performance nativa
export const MenuFooter = memo(function MenuFooter({
  abaAtiva,
  aoMudarAba,
}: MenuFooterProps) {
  // ⚡ Configurações estáticas de cores e estados para evitar processamento de strings Tailwind
  const obterEstiloAba = (aba: TabOpcoes) => {
    const ativa = abaAtiva === aba;
    return {
      cor: "#3F5CC4",
      bgLinha: ativa ? "bg-[#3F5CC4]" : "bg-transparent",
      opacidadeTexto: ativa ? "opacity-100" : "opacity-60",
    };
  };

  const statusHome = obterEstiloAba("home");
  const statusFavoritas = obterEstiloAba("favoritas");
  const statusPerfil = obterEstiloAba("perfil");

  return (
    <View className="w-full bg-white border-t border-gray-100">
      {/* Container principal das Abas */}
      <View className="w-full flex-row justify-around items-center h-20 px-4">
        {/* ABA: HOME */}
        <Pressable
          onPress={() => aoMudarAba("home")}
          className="items-center justify-center flex-1 h-full"
        >
          <View
            className={`w-16 h-1 rounded-full mb-2 ${statusHome.bgLinha}`}
          />
          <Ionicons
            name={abaAtiva === "home" ? "home" : "home-outline"}
            size={24}
            color={statusHome.cor}
          />
          <Text
            style={{ fontFamily: fonts.regular }}
            className={`text-[#3F5CC4] text-xs mt-1 ${statusHome.opacidadeTexto}`}
          >
            Home
          </Text>
        </Pressable>

        {/* ABA: FAVORITAS */}
        <Pressable
          onPress={() => aoMudarAba("favoritas")}
          className="items-center justify-center flex-1 h-full"
        >
          <View
            className={`w-16 h-1 rounded-full mb-2 ${statusFavoritas.bgLinha}`}
          />
          <Ionicons
            name={abaAtiva === "favoritas" ? "star" : "star-outline"}
            size={24}
            color={statusFavoritas.cor}
          />
          <Text
            style={{ fontFamily: fonts.regular }}
            className={`text-[#3F5CC4] text-xs mt-1 ${statusFavoritas.opacidadeTexto}`}
          >
            Favoritas
          </Text>
        </Pressable>

        {/* ABA: PERFIL */}
        <Pressable
          onPress={() => aoMudarAba("perfil")}
          className="items-center justify-center flex-1 h-full"
        >
          <View
            className={`w-16 h-1 rounded-full mb-2 ${statusPerfil.bgLinha}`}
          />
          <Ionicons
            name={abaAtiva === "perfil" ? "person" : "person-outline"}
            size={24}
            color={statusPerfil.cor}
          />
          <Text
            style={{ fontFamily: fonts.regular }}
            className={`text-[#3F5CC4] text-xs mt-1 ${statusPerfil.opacidadeTexto}`}
          >
            Perfil
          </Text>
        </Pressable>
      </View>

      {/* Espaçamento do sistema (iOS / Android) */}
      <View
        className="bg-white w-full"
        style={{
          height: Platform.OS === "ios" ? 28 : 12,
        }}
      />
    </View>
  );
});
