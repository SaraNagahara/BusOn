import { fonts } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
// Importamos a interface da rota e a função de cálculo
import { RotaProps, calcularProximoHorario } from "@/constants/rotasDados";

interface RotasFavoritasProps {
  estaLogado: boolean;
  rotasFavoritas?: RotaProps[]; // Agora recebe a lista de rotas completas
  filtroOrigem: "rodoviaria" | "destino";
  aoClicarAdicionarFavorita: () => void;
  aoClicarNaRota?: (rota: RotaProps) => void;
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

  const renderItem = ({ item }: { item: RotaProps }) => {
    // Calcula o horário dinamicamente baseado no filtro selecionado
    const direcao = filtroOrigem === "rodoviaria" ? "origem" : "destino";
    const horarioProximo = calcularProximoHorario(item.horarios, direcao);

    return (
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
          {horarioProximo}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="w-full mt-5 mb-2">
      <View className="flex-row items-center justify-between mb-3 px-1">
        <Text
          style={{ fontFamily: fonts.bold }}
          className="text-[#000000] text-xl tracking-tight"
        >
          Minhas rotas favoritas
        </Text>

        <View className="bg-[#E2E8F0] px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
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

      <View className="w-full bg-[#F2F4F7] rounded-2xl p-4 justify-center overflow-hidden">
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
          <View className="flex-1 w-full gap-2">
            {rotasLimitadas.map((item) => (
              <View key={item.id} className="w-full">
                {renderItem({ item })}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
