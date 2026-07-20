import { fonts } from "@/app/_layout";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface HeaderLinhaSelecionadaProps {
  nomeDestino: string;
  onPressFiltro?: () => void;
  isFavorito?: boolean;
  onPressFavorito?: () => void;
}

export default function HeaderLinhaSelecionada({
  nomeDestino,
  onPressFiltro,
  isFavorito = false,
  onPressFavorito,
}: HeaderLinhaSelecionadaProps) {
  return (
    <View className="w-full flex-row items-center justify-between py-4">
      {/* 📝 LADO ESQUERDO: Textos Informativos */}
      <View className="flex-1 pr-4">
        <Text
          style={{ fontFamily: fonts.bold }}
          className="text-[#1A1C1E] text-2xl uppercase tracking-tight"
        >
          LINHA – {nomeDestino}
        </Text>

        <View className="flex-row items-center mt-1">
          <Feather name="clock" size={14} color="#5E6370" />
          <Text
            style={{ fontFamily: fonts.regular }}
            className="text-[#5E6370] text-sm ml-1.5"
          >
            Tabela de horários de partida
          </Text>
        </View>
      </View>

      {/* ⏳ LADO DIREITO: Botões de Ação */}
      <View className="flex-row items-center gap-3">
        {/* Botão Favorito */}
        <TouchableOpacity
          onPress={onPressFavorito}
          activeOpacity={0.7}
          className="w-12 h-12 bg-white border border-slate-200 rounded-full items-center justify-center shadow-sm"
        >
          <Ionicons
            // O Ionicons tem nomes específicos para as versões preenchidas (com -sharp ou -outline)
            name={isFavorito ? "heart" : "heart-outline"}
            size={22}
            color={isFavorito ? "#EF4444" : "#94A3B8"}
          />
        </TouchableOpacity>

        {/* Botão Filtro */}
        <TouchableOpacity
          onPress={onPressFiltro}
          activeOpacity={0.7}
          className="w-12 h-12 bg-[#3F5CC4] rounded-full items-center justify-center shadow-sm"
        >
          <Feather name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
