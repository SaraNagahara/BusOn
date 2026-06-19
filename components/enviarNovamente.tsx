import { Ionicons } from "@expo/vector-icons"; // Importação oficial do Expo
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ReenviarBotaoProps {
  onPress: () => void;
  label?: string;
}

export default function ReenviarBotao({
  onPress,
  label = "Enviar novamente",
}: ReenviarBotaoProps) {
  // Cor exata azul para o texto e o ícone
  const corAzul = "#1D61E7";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      // flex-row deixa lado a lado, items-center centraliza na linha, gap-2 dá o espaçamento entre eles
      className="flex-row items-center justify-center p-2 self-center gap-2"
    >
      {/* Ícone de rotação/refresh igual ao da imagem */}
      <Ionicons name="refresh-outline" size={24} color={corAzul} />

      {/* Texto ao lado do ícone */}
      <Text style={{ color: corAzul }} className="text-xl font-medium">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
