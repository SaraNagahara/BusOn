import { fonts } from "@/app/_layout";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface CarrosselRotasProps {
  filtro: "rodoviaria" | "destino";
  historicoIds: string[];
}

export function CarrosselRotas({ filtro, historicoIds }: CarrosselRotasProps) {
  const router = useRouter();

  // O useMemo aqui garante que sempre que historicoIds mudar,
  // a lista seja re-ordenada instantaneamente.
  const dadosOrdenados = useMemo(() => {
    // Criamos uma cópia do array original para não mutar o MOCK
    return [...ROTAS_MOCK].sort((a, b) => {
      const indexA = historicoIds.indexOf(a.id);
      const indexB = historicoIds.indexOf(b.id);

      // Se ambos estão no histórico, mantém a ordem do histórico
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;

      // Se A está no histórico, ele vem antes (indexA menor que 0 é falso)
      if (indexA !== -1) return -1;

      // Se B está no histórico, ele vem antes
      if (indexB !== -1) return 1;

      // Se nenhum está no histórico, mantém a ordem original
      return 0;
    });
  }, [historicoIds]); // 👈 DEPENDENCIA CRÍTICA: Se o histórico mudar, o carrossel re-ordena

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
          {item.proximoHorario}
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
        data={dadosOrdenados} // Passamos a lista já ordenada
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingRight: 24 }}
      />
    </View>
  );
}
