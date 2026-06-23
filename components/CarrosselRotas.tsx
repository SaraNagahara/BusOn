import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";
import { fonts } from "../app/_layout";

export interface RotaProps {
  id: string;
  destino: string;
  horario: string;
}

interface CarrosselRotasProps {
  filtro: "rodoviaria" | "destino";
  estaLogado: boolean;
  recentesRodoviaria?: RotaProps[]; // Histórico específico da Rodoviária
  recentesDestino?: RotaProps[]; // Histórico específico de Destinos
  aoClicarNaRota?: (rota: RotaProps) => void;
}

// DADOS PÚBLICOS (Se deslogado)
const PUBLICO_RODOVIARIA: RotaProps[] = [
  { id: "1", destino: "S. João novo", horario: "15:30" },
  { id: "2", destino: "Guaçu", horario: "15:55" },
  { id: "3", destino: "Canguera", horario: "15:40" },
  { id: "4", destino: "Mailasqui", horario: "16:15" },
];

const PUBLICO_DESTINO: RotaProps[] = [
  { id: "d1", destino: "Sorocaba", horario: "17:00" },
  { id: "d2", destino: "Mairinque", horario: "17:45" },
  { id: "d3", destino: "São Paulo", horario: "18:20" },
  { id: "d4", destino: "Ibiúna", horario: "19:10" },
];

export function CarrosselRotas({
  filtro,
  estaLogado,
  recentesRodoviaria = [],
  recentesDestino = [],
  aoClicarNaRota,
}: CarrosselRotasProps) {
  // Define qual lista usar com base no login e no filtro selecionado
  let dadosAtuais: RotaProps[] = [];

  if (estaLogado) {
    dadosAtuais =
      filtro === "rodoviaria" ? recentesRodoviaria : recentesDestino;
  } else {
    dadosAtuais =
      filtro === "rodoviaria" ? PUBLICO_RODOVIARIA : PUBLICO_DESTINO;
  }

  const renderCard = ({ item }: { item: RotaProps }) => (
    <Pressable
      onPress={() => aoClicarNaRota?.(item)}
      className="bg-[#2449AE] w-36 h-36 rounded-2xl p-4 flex-col active:opacity-80"
    >
      <Ionicons
        name={estaLogado ? "time-outline" : "bus"}
        size={20}
        color="#FFFFFF"
      />

      <View className="flex-col gap-0.5 mt-6">
        <Text
          numberOfLines={2}
          style={{ fontFamily: fonts.bold }}
          className="text-white text-base leading-5 tracking-tight"
        >
          {item.destino}
        </Text>
        <Text
          style={{ fontFamily: fonts.regular }}
          className="text-white/90 text-sm"
        >
          {item.horario}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="w-full my-3">
      {/* TEXTO DE APOIO ULTRA INTUITIVO PARA O USUÁRIO LOGADO */}
      {estaLogado && (
        <Text
          style={{ fontFamily: fonts.medium }}
          className="text-gray-500 text-sm mb-2 px-1"
        >
          {filtro === "rodoviaria"
            ? "Suas buscas partindo da Rodoviária"
            : "Suas buscas partindo do Destino Final"}
        </Text>
      )}

      <FlatList
        data={dadosAtuais}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 10,
          paddingRight: 24,
        }}
      />
    </View>
  );
}
