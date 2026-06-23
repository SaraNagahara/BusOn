import { Text, View } from "react-native";
import { fonts } from "../app/_layout"; // Ajuste o caminho do seu _layout se necessário

interface HomeHeaderProps {
  subtitulo?: string;
}

export function HomeHeader({
  subtitulo = "Qual o seu destino de hoje ?",
}: HomeHeaderProps) {
  return (
    <View className="w-full bg-white pt-4 pb-3 px-6 border-b border-gray-200">
      {/* Título Principal */}
      <Text
        style={{
          fontFamily: fonts.bold,
          color: "#000000",
          fontSize: 28,
          lineHeight: 34,
        }}
        className="tracking-tight"
      >
        Seja Bem-Vindo
      </Text>

      {/* Subtítulo dinâmico */}
      <Text
        style={{
          fontFamily: fonts.regular,
          color: "#9CA3AF", // Cor cinza clara do seu print
          fontSize: 16,
          lineHeight: 22,
        }}
        className="mt-1"
      >
        {subtitulo}
      </Text>
    </View>
  );
}
