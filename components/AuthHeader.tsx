import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

// Importe seus ícones
import { fonts } from "@/app/_layout";
import LogoApp from "../assets/icons/logoApp.svg";
import SetaBrancaEsquerda from "../assets/icons/setabrancacomtraco.svg";

interface AuthHeaderProps {
  titulo: string;
  subtitulo: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  titulo,
  subtitulo,
}) => {
  const router = useRouter();

  return (
    <View className="pt-4 px-6 mb-6">
      {/* Linha da Seta e Logo */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity
          onPress={() => router.back()} // Volta para a tela anterior automaticamente
          className="w-12 h-12 justify-center items-center"
        >
          <SetaBrancaEsquerda width="100%" height="100%" />
        </TouchableOpacity>

        <View className="w-32 h-10">
          <LogoApp width="100%" height="100%" />
        </View>
      </View>

      {/* Textos de Boas-vindas */}
      <View>
        <Text
          style={{ fontFamily: fonts.bold }}
          className="text-white text-3xl"
        >
          {titulo}
        </Text>
        <Text className="text-white text-lg opacity-80 mt-1">{subtitulo}</Text>
      </View>
    </View>
  );
};
