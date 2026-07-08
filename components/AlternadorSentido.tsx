import { fonts } from "@/app/_layout";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"; // 👈 Mudamos as coleções aqui
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export type SentidoTipo = "rodoviaria" | "destino";

interface AlternadorSentidoProps {
  labelDestino: string;
  onMudarSentido: (sentido: SentidoTipo) => void;
}

export default function AlternadorSentido({
  labelDestino,
  onMudarSentido,
}: AlternadorSentidoProps) {
  const [sentidoAtivo, setSentidoAtivo] = useState<SentidoTipo>("rodoviaria");

  const handleTrocarSentido = (sentido: SentidoTipo) => {
    setSentidoAtivo(sentido);
    onMudarSentido(sentido);
  };

  return (
    <View className="w-full bg-[#EFEFF4] rounded-full p-1 flex-row items-center border border-gray-200/50">
      
      {/* 🏙️ BOTÃO: RODOVIÁRIA */}
      <Pressable
        onPress={() => handleTrocarSentido("rodoviaria")}
        style={{ backgroundColor: sentidoAtivo === "rodoviaria" ? "#3F5CC4" : "transparent" }}
        className="flex-1 flex-row items-center justify-center py-3.5 rounded-full"
      >
        {/* 🏢 Ícone de prédio corporativo/rodoviária universal do MaterialIcons */}
        <MaterialIcons
          name="location-city"
          size={20}
          color={sentidoAtivo === "rodoviaria" ? "white" : "#5E6370"}
        />
        <Text
          style={{ fontFamily: fonts.medium }}
          className={`text-sm ml-2 ${
            sentidoAtivo === "rodoviaria" ? "text-white font-semibold" : "text-[#5E6370]"
          }`}
        >
          Rodoviária
        </Text>
      </Pressable>

      {/* 🪧 BOTÃO: DESTINO */}
      <Pressable
        onPress={() => handleTrocarSentido("destino")}
        style={{ backgroundColor: sentidoAtivo === "destino" ? "#3F5CC4" : "transparent" }}
        className="flex-1 flex-row items-center justify-center py-3.5 rounded-full"
      >
        {/* 🗺️ Ícone de mapa com pin (ou direções) do FontAwesome5 que nunca falha */}
        <FontAwesome5
          name="map-marked-alt"
          size={16}
          color={sentidoAtivo === "destino" ? "white" : "#5E6370"}
        />
        <Text
          style={{ fontFamily: fonts.medium }}
          className={`text-sm ml-2 ${
            sentidoAtivo === "destino" ? "text-white font-semibold" : "text-[#5E6370]"
          }`}
        >
          {labelDestino}
        </Text>
      </Pressable>

    </View>
  );
}