import { fonts } from "@/app/_layout";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, Text, View } from "react-native";

export interface RotaProps {
  id: string;
  destino: string;
  horario: string;
}

interface CarrosselRotasProps {
  filtro: "rodoviaria" | "destino";
  estaLogado: boolean;
  recentesRodoviaria?: RotaProps[];
  recentesDestino?: RotaProps[];
  aoClicarNaRota?: (rota: RotaProps) => void;
}

// 🌐 Função utilitária para obter a data/hora atual convertida estritamente para o Horário de Brasília (UTC-3)
const obterDataBrasilia = (): Date => {
  const agora = new Date();
  const fusoBrasilia =
    agora.getTime() + agora.getTimezoneOffset() * 60000 - 3 * 3600000;
  return new Date(fusoBrasilia);
};

// 🕒 Função auxiliar para calcular a proximidade de um horário (HH:MM) com o Horário de Brasília atual
const obterDiferencaMinutos = (horarioRota: string): number => {
  const agoraBrasilia = obterDataBrasilia();
  const [horasRota, minutosRota] =
    horarioRota && horarioRota.includes(":")
      ? horarioRota.split(":").map(Number)
      : [0, 0];

  const minutosAtuais =
    agoraBrasilia.getHours() * 60 + agoraBrasilia.getMinutes();
  const minutosDoOnibus = horasRota * 60 + minutosRota;

  let diferenca = minutosDoOnibus - minutosAtuais;

  if (diferenca < 0) {
    diferenca += 24 * 60;
  }

  return diferenca;
};

export function CarrosselRotas({
  filtro,
  estaLogado,
  recentesRodoviaria = [],
  recentesDestino = [],
  aoClicarNaRota,
}: CarrosselRotasProps) {
  // O carrossel renderiza o histórico dinâmico e filtrado que a inicial.tsx montou do arquivo central
  const dadosAtuais =
    filtro === "rodoviaria" ? recentesRodoviaria : recentesDestino;

  // 🔄 Ordenação Inteligente: Mantém a busca recente no topo e ordena o resto por horário
  const dadosOrdenados = [...dadosAtuais].sort((a, b) => {
    const aEBuscaRecente = a.id.startsWith("auto_");
    const bEBuscaRecente = b.id.startsWith("auto_");

    // Se "a" for uma busca recente do usuário e "b" não, "a" fica primeiro
    if (aEBuscaRecente && !bEBuscaRecente) return -1;
    if (!aEBuscaRecente && bEBuscaRecente) return 1;

    // Se ambos forem buscas recentes, o mais novo (timestamp maior no final do ID) fica primeiro
    if (aEBuscaRecente && bEBuscaRecente) {
      const timestampA = Number(a.id.split("_")[2]) || 0;
      const timestampB = Number(b.id.split("_")[2]) || 0;
      return timestampB - timestampA;
    }

    // Caso nenhum seja busca recente (ex: dados iniciais/mock), ordena pelo horário mais próximo de Brasília
    return obterDiferencaMinutos(a.horario) - obterDiferencaMinutos(b.horario);
  });

  const renderCard = ({ item }: { item: RotaProps }) => (
    <Pressable
      onPress={() => aoClicarNaRota?.(item)}
      className="bg-[#2449AE] w-36 h-36 rounded-2xl p-4 flex-col active:opacity-80"
    >
      <Ionicons name="time-outline" size={20} color="#FFFFFF" />

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
      <Text
        style={{ fontFamily: fonts.medium }}
        className="text-gray-500 text-sm mb-2 px-1"
      >
        {/* {estaLogado
          ? filtro === "rodoviaria"
            ? "Suas buscas partindo da Rodoviária"
            : "Suas buscas partindo do Destino Final"
          : "Histórico de buscas recentes"} */}
        Suas buscas de São Roque - SP
      </Text>

      <FlatList
        data={dadosOrdenados}
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
