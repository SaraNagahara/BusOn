import { fonts } from "@/app/_layout";
import { Pressable, Text, View } from "react-native";

export type TipoLinhaOpcoes = "todas" | "urbanas" | "intermunicipais";

interface FiltroBuscaProps {
  filtroAtivo: TipoLinhaOpcoes;
  aoMudarFiltro: (filtro: TipoLinhaOpcoes) => void;
}

export function FiltroBusca({ filtroAtivo, aoMudarFiltro }: FiltroBuscaProps) {
  const renderChip = (label: string, tipo: TipoLinhaOpcoes) => {
    const isActive = filtroAtivo === tipo;

    return (
      <Pressable
        onPress={() => aoMudarFiltro(tipo)}
        // flex-1 faz com que as 3 cápsulas dividam o tamanho da tela igualmente
        // py-3.5 mantém o preenchimento gordinho e robusto por dentro
        className={`flex-1 py-3.5 rounded-full items-center justify-center active:opacity-90 ${
          isActive ? "bg-[#2563EB]" : "bg-[#F1F5F9]"
        }`}
      >
        <Text
          style={{ fontFamily: isActive ? fonts.bold : fonts.medium }}
          // text-[14px] ou text-sm garante que "Intermunicipais" não esprema ou quebre mesmo em telas menores
          className={`text-sm tracking-tight text-center ${
            isActive ? "text-white" : "text-[#475569]"
          }`}
          numberOfLines={1}
          adjustsFontSizeToFit // Diminui sutilmente a fonte se o celular for muito pequeno
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    // flex-row e gap-2 distribui os três lado a lado cravados nas margens da tela
    <View className="w-full flex-row gap-2 my-4 justify-between items-center">
      {renderChip("Todas", "todas")}
      {renderChip("Urbanas", "urbanas")}
      {renderChip("Intermunicipais", "intermunicipais")}
    </View>
  );
}
