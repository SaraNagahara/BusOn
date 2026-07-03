import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { fonts } from "../app/_layout";
import LogoApp from "../assets/icons/logoApp.svg"; // 👈 Importado conforme seu caminho de assets

{
  /*tem q colocar uma logo escurecida no photoshop pq da pra ver nao */
}
interface HomeHeaderProps {
  titulo?: string;
  subtitulo?: string;
  dataAtualizacao?: string;
  onPressLogo?: () => void; // 👈 Opcional: caso queira passar uma ação customizada (ex: fechar busca)
}

export function HomeHeader({
  titulo = "Seja Bem-Vindo",
  subtitulo = "Qual o seu destino de hoje ?",
  dataAtualizacao = "Horários atualizados em: 28/06/2026",
  onPressLogo,
}: HomeHeaderProps) {
  const router = useRouter();

  const handleLogoPress = () => {
    if (onPressLogo) {
      onPressLogo(); // Roda a função customizada se ela existir
    } else {
      router.replace("/inicial"); // Padrão: Reseta o app voltando para a Home
    }
  };

  return (
    <View className="w-full bg-white pt-4 pb-3 px-6 border-b border-gray-200">
      {/* 🥞 CONTAINER DA PRIMEIRA LINHA: Título + Logo alinhados perfeitamente */}
      <View className="flex-row justify-between items-center w-full">
        {/* Título Principal Dinâmico */}
        <Text
          style={{
            fontFamily: fonts.bold,
            color: "#000000",
            fontSize: 28,
            lineHeight: 34,
          }}
          className="tracking-tight flex-1 pr-2" // flex-1 garante que textos longos não empurrem a logo para fora
        >
          {titulo}
        </Text>

        {/* 🔘 ÍCONE DO SISTEMA COMO BOTÃO HOME RESET */}
        <TouchableOpacity
          onPress={handleLogoPress}
          activeOpacity={0.7}
          className="w-24 h-8 justify-center items-end"
        >
          <LogoApp
            width="100%"
            height="100%"
            preserveAspectRatio="xMaxYMin meet"
          />
        </TouchableOpacity>
      </View>

      {/* Subtítulo dinâmico (Mantido intacto abaixo) */}
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

      {/* Data de atualização (Mantido intacto abaixo) */}
      <Text
        style={{
          fontFamily: fonts.regular,
          color: "#9CA3AF",
          fontSize: 10,
          lineHeight: 22,
        }}
        className="mt-1"
      >
        {dataAtualizacao}
      </Text>
    </View>
  );
}
