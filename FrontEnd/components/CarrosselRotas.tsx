import { fonts } from "@/app/_layout";
import { ROTAS_MOCK, calcularProximoHorario } from "@/constants/rotasDados";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface CarrosselRotasProps {
  // Mantemos o tipo que a função espera
  filtro: "rodoviaria" | "origem" | "destino";
  historicoIds: string[];
  rotaEmDestaqueId?: string | null;
}

export function CarrosselRotas({
  filtro,
  historicoIds,
  rotaEmDestaqueId,
}: CarrosselRotasProps) {
  const router = useRouter();

  const dadosOrdenados = useMemo(() => {
    let base = [...ROTAS_MOCK];

    // Se houver uma rota em destaque, ela ganha prioridade absoluta
    if (rotaEmDestaqueId) {
      const destaque = base.find((r) => r.id === rotaEmDestaqueId);
      if (destaque) {
        return [destaque, ...base.filter((r) => r.id !== rotaEmDestaqueId)];
      }
    }

    // Lógica original de ordenação por histórico
    return base.sort((a, b) => {
      const indexA = historicoIds.indexOf(a.id);
      const indexB = historicoIds.indexOf(b.id);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    });
  }, [historicoIds, rotaEmDestaqueId]);

  const renderCard = ({ item }: { item: (typeof ROTAS_MOCK)[0] }) => (
    <Pressable
      onPress={() => router.push(`/horarios/${item.id}`)}
      className="bg-[#2449AE] w-36 h-36 rounded-2xl p-4 flex-col active:opacity-80"
    >
      <Ionicons name="time-outline" size={20} color="#FFFFFF" />
      <View className="flex-col gap-0.5 mt-6">
        <Text
          numberOfLines={2}
          style={{ fontFamily: fonts.bold }}
          className="text-white text-base"
        >
          {item.destino}
        </Text>
        <Text
          style={{ fontFamily: fonts.regular }}
          className="text-white/90 text-sm"
        >
          {calcularProximoHorario(
            item.horarios,
            filtro === "rodoviaria" || filtro === "origem"
              ? "origem"
              : "destino",
          )}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View className="w-full my-3">
      <Text
        style={{ fontFamily: fonts.medium }}
        className="text-gray-500 text-sm mb-2 px-1"
      >
        Suas buscas de São Roque - SP
      </Text>
      <FlatList
        data={dadosOrdenados}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingRight: 24 }}
      />
    </View>
  );
}
