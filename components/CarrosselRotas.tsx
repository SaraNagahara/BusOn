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
  recentesRodoviaria?: RotaProps[]; // Histórico dinâmico da Rodoviária enviado pelo Pai
  recentesDestino?: RotaProps[]; // Histórico dinâmico de Destinos enviado pelo Pai
  aoClicarNaRota?: (rota: RotaProps) => void;
}

export function CarrosselRotas({
  filtro,
  estaLogado,
  recentesRodoviaria = [],
  recentesDestino = [],
  aoClicarNaRota,
}: CarrosselRotasProps) {
  // O carrossel agora usa estritamente o histórico dinâmico enviado pela Inicial.tsx
  const dadosAtuais =
    filtro === "rodoviaria" ? recentesRodoviaria : recentesDestino;

  const renderCard = ({ item }: { item: RotaProps }) => (
    <Pressable
      onPress={() => aoClicarNaRota?.(item)}
      className="bg-[#2449AE] w-36 h-36 rounded-2xl p-4 flex-col active:opacity-80"
    >
      <Ionicons
        name="time-outline" // Mantém o ícone de histórico/tempo para ambos os estados de login
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
      {/* Texto de apoio adaptado para a experiência (Suas buscas / Histórico recente) */}
      <Text
        style={{ fontFamily: fonts.medium }}
        className="text-gray-500 text-sm mb-2 px-1"
      >
        {estaLogado
          ? filtro === "rodoviaria"
            ? "Suas buscas partindo da Rodoviária"
            : "Suas buscas partindo do Destino Final"
          : "Histórico de buscas recentes"}
      </Text>

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
