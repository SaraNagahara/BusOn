import { fonts } from "@/app/_layout"; // 👈 Garante o uso das suas fontes do Inter
import { Feather } from "@expo/vector-icons"; // 👈 Mudamos para a coleção Feather para um ícone mais clean e idêntico ao protótipo
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderLinhaSelecionadaProps {
  numeroLinha: string | number;
  nomeDestino: string;
  onPressFiltro?: () => void;
}

export default function HeaderLinhaSelecionada({
  numeroLinha,
  nomeDestino,
  onPressFiltro,
}: HeaderLinhaSelecionadaProps) {
  return (
    <View className="w-full flex-row items-center justify-between py-4">
      {/* 📝 LADO ESQUERDO: Textos Informativos */}
      <View className="flex-1 pr-4">
        {/* Título Principal Dinâmico */}
        <Text
          style={{ fontFamily: fonts.bold }}
          className="text-[#1A1C1E] text-2xl uppercase tracking-tight"
        >
          LINHA {numeroLinha} – {nomeDestino}
        </Text>

        {/* Subtítulo com Ícone de Relógio */}
        <View className="flex-row items-center mt-1">
          {/* Usando o relógio do Feather para combinar o estilo dos traços */}
          <Feather name="clock" size={14} color="#5E6370" />
          <Text
            style={{ fontFamily: fonts.regular }}
            className="text-[#5E6370] text-sm ml-1.5"
          >
            Tabela de horários de partida
          </Text>
        </View>
      </View>

      {/* ⏳ LADO DIREITO: Botão do Filtro Customizado */}
      <View>
        <TouchableOpacity
          onPress={onPressFiltro}
          activeOpacity={0.7}
          className="w-12 h-12 bg-[#3F5CC4] rounded-full items-center justify-center shadow-sm"
        >
          {/* 🌟 ÍCONE ATUALIZADO: Funil vazado idêntico ao da sua imagem */}
          <Feather name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
