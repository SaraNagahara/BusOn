import { Text, View } from "react-native";
import { fonts } from "../app/_layout";

interface HomeHeaderProps {
  titulo?: string; // 👈 1. ADICIONADO TITULO OPCIONAL
  subtitulo?: string;
}

export function HomeHeader({
  titulo = "Seja Bem-Vindo", // 👈 2. VALOR PADRÃO CASO NÃO SEJA PASSADO
  subtitulo = "Qual o seu destino de hoje ?",
}: HomeHeaderProps) {
  return (
    <View className="w-full bg-white pt-4 pb-3 px-6 border-b border-gray-200">
      {/* Título Principal Dinâmico */}
      <Text
        style={{
          fontFamily: fonts.bold,
          color: "#000000",
          fontSize: 28,
          lineHeight: 34,
        }}
        className="tracking-tight"
      >
        {titulo} {/* 👈 3. AGORA EXIBE A VARIÁVEL */}
      </Text>

      {/* Subtítulo dinâmico */}
      <Text
        style={{
          fontFamily: fonts.regular,
          color: "#9CA3AF",
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
