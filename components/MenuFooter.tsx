import { Ionicons } from "@expo/vector-icons";
import { Platform, Pressable, Text, View } from "react-native";
import { fonts } from "../app/_layout";

export type TabOpcoes = "home" | "favoritas" | "perfil";

interface MenuFooterProps {
  abaAtiva: TabOpcoes;
  aoMudarAba: (aba: TabOpcoes) => void;
}

export function MenuFooter({ abaAtiva, aoMudarAba }: MenuFooterProps) {
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
            className={`w-16 h-1 rounded-full mb-2 ${abaAtiva === "home" ? "bg-[#3F5CC4]" : "bg-transparent"}`}
          />
          <Ionicons
            name={abaAtiva === "home" ? "home" : "home-outline"}
            size={24}
            color="#3F5CC4"
          />
          <Text
            style={{ fontFamily: fonts.regular }}
            className={`text-[#3F5CC4] text-xs mt-1 ${abaAtiva === "home" ? "opacity-100" : "opacity-60"}`}
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
            className={`w-16 h-1 rounded-full mb-2 ${abaAtiva === "favoritas" ? "bg-[#3F5CC4]" : "bg-transparent"}`}
          />
          <Ionicons
            name={abaAtiva === "favoritas" ? "star" : "star-outline"}
            size={24}
            color="#3F5CC4"
          />
          <Text
            style={{ fontFamily: fonts.regular }}
            className={`text-[#3F5CC4] text-xs mt-1 ${abaAtiva === "favoritas" ? "opacity-100" : "opacity-60"}`}
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
            className={`w-16 h-1 rounded-full mb-2 ${abaAtiva === "perfil" ? "bg-[#3F5CC4]" : "bg-transparent"}`}
          />
          <Ionicons
            name={abaAtiva === "perfil" ? "person" : "person-outline"}
            size={24}
            color="#3F5CC4"
          />
          <Text
            style={{ fontFamily: fonts.regular }}
            className={`text-[#3F5CC4] text-xs mt-1 ${abaAtiva === "perfil" ? "opacity-100" : "opacity-60"}`}
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
}
