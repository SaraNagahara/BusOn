import { fonts } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";

export interface RotaFavoritaProps {
  id: string;
  destino: string;
  horario: string;
}

interface RotasFavoritasProps {
  estaLogado: boolean;
  rotasFavoritas?: RotaFavoritaProps[];
  filtroOrigem: "rodoviaria" | "destino";
  aoClicarAdicionarFavorita: () => void;
  aoClicarNaRota?: (rota: RotaFavoritaProps) => void;
}

export function RotasFavoritas({
  estaLogado,
  rotasFavoritas = [],
  filtroOrigem,
  aoClicarAdicionarFavorita,
  aoClicarNaRota,
}: RotasFavoritasProps) {
  const temRotas = estaLogado && rotasFavoritas.length > 0;
  const rotasLimitadas = rotasFavoritas.slice(0, 5);

  const renderItem = ({ item }: { item: RotaFavoritaProps }) => (
    <Pressable
      onPress={() => aoClicarNaRota?.(item)}
      className="w-full bg-white border border-[#3F5CC4] rounded-xl h-14 px-4 flex-row items-center justify-between active:opacity-90"
    >
      <View className="flex-row items-center flex-1 pr-4">
        <View className="w-10 h-10 bg-[#E5E7EB] rounded-lg items-center justify-center flex-row mr-3">
          <Ionicons name="bus" size={20} color="#000000" />
        </View>
        <Text
          numberOfLines={1}
          style={{ fontFamily: fonts.medium }}
          className="text-[#000000] text-base flex-1"
        >
          {item.destino}
        </Text>
      </View>

      <Text
        style={{ fontFamily: fonts.regular }}
        className="text-gray-500 text-base pr-1"
      >
        {item.horario}
      </Text>
    </Pressable>
  );

  return (
    <View className="w-full mt-5 mb-2">
      {/* HEADER DO BLOCO */}
      <View className="flex-row items-center justify-between mb-3 px-1">
        <Text
          style={{ fontFamily: fonts.bold }}
          className="text-[#000000] text-xl tracking-tight"
        >
          Minhas rotas favoritas
        </Text>

        {/* INDICADOR DE CONTEXTO (Estilo pílula do seletor, mas flat/informativo) */}
        <View className="bg-[#E2E8F0] px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
          {/* Ícone sutil para reforçar que é informativo */}
          <Ionicons
            name={filtroOrigem === "rodoviaria" ? "location" : "home"}
            size={12}
            color="#475569"
          />
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-[#475569] text-xs uppercase tracking-wider"
          >
            {filtroOrigem === "rodoviaria" ? "Rodoviária" : "Destino"}
          </Text>
        </View>
      </View>

      {/* CONTAINER PRINCIPAL CINZA */}
      <View className="w-full bg-[#F2F4F7] rounded-2xl p-4 h-[240px] justify-center overflow-hidden">
        {!temRotas && (
          <View className="items-center justify-center flex-col py-4">
            <View className="w-14 h-14 bg-white rounded-full items-center justify-center mb-3 flex-row">
              <Ionicons name="star-outline" size={24} color="#9CA3AF" />
            </View>

            <Text
              style={{ fontFamily: fonts.regular }}
              className="text-[#9CA3AF] text-sm text-center mb-4"
            >
              Nenhuma rota salva ainda
            </Text>

            <Pressable
              onPress={aoClicarAdicionarFavorita}
              className="bg-white px-6 h-10 rounded-full items-center justify-center border border-gray-100 shadow-sm active:opacity-80"
            >
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-[#2449AE] text-sm"
              >
                Adicionar favorita
              </Text>
            </Pressable>
          </View>
        )}

        {temRotas && (
          <FlatList
            data={rotasLimitadas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ gap: 8 }}
            nestedScrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
}
