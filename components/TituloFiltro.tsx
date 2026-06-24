import { Text, View } from "react-native";
import { fonts } from "../app/_layout";
import { TipoLinhaOpcoes } from "./FiltroBusca";

interface TituloFiltroProps {
  filtroAtivo: TipoLinhaOpcoes;
}

export function TituloFiltro({ filtroAtivo }: TituloFiltroProps) {
  // Define o texto dinâmico com base no filtro selecionado
  const obterTexto = () => {
    switch (filtroAtivo) {
      case "urbanas":
        return "LINHAS URBANAS";
      case "intermunicipais":
        return "LINHAS INTERMUNICIPAIS";
      case "todas":
      default:
        return "TODAS AS LINHAS";
    }
  };

  return (
    <View className="w-full pl-1 mt-4 mb-2">
      <Text
        style={{
          fontFamily: fonts.bold, // Usa a variação Bold ou Medium para dar o peso correto
          letterSpacing: 1.5, // Dá o espaçamento entre letras (tracking) idêntico ao da imagem
        }}
        className="text-[#3A4454] text-sm tracking-widest"
      >
        {obterTexto()}
      </Text>
    </View>
  );
}
