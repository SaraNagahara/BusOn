import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { fonts } from "../app/_layout";
import { TipoLinhaOpcoes } from "./FiltroBusca";

export interface RotaResultadoProps {
  id: string;
  destino: string;
  origem: string;
  proximoHorario: string;
  tipo: TipoLinhaOpcoes;
}

interface ListaResultadosBuscaProps {
  filtroCategoria: TipoLinhaOpcoes;
  textoBusca: string;
  listaFavoritosIds: string[]; // <-- Nova Prop: IDs que já estão favoritados
  aoAlternarFavorito: (id: string, destino: string) => void; // <-- Nova Prop: Callback de ação
  aoClicarNaRota?: (rota: RotaResultadoProps) => void;
}

const ROTAS_FICTICIAS: RotaResultadoProps[] = [
  {
    id: "1",
    destino: "Canguera",
    origem: "Terminal de São Roque",
    proximoHorario: "18:10",
    tipo: "urbanas",
  },
  {
    id: "2",
    destino: "Sorocaba",
    origem: "Terminal de São Roque",
    proximoHorario: "16:10",
    tipo: "intermunicipais",
  },
  {
    id: "3",
    destino: "Guaçu",
    origem: "Terminal de São Roque",
    proximoHorario: "17:35",
    tipo: "urbanas",
  },
  {
    id: "4",
    destino: "Mairinque",
    origem: "Terminal de São Roque",
    proximoHorario: "15:45",
    tipo: "intermunicipais",
  },
  {
    id: "5",
    destino: "Mailasqui",
    origem: "Terminal de São Roque",
    proximoHorario: "19:00",
    tipo: "urbanas",
  },
  {
    id: "6",
    destino: "São João novo",
    origem: "Terminal de São Roque",
    proximoHorario: "20:15",
    tipo: "urbanas",
  },
  {
    id: "7",
    destino: "São Paulo",
    origem: "Terminal de São Roque",
    proximoHorario: "06:30",
    tipo: "intermunicipais",
  },
  {
    id: "8",
    destino: "Ibiúna",
    origem: "Terminal de São Roque",
    proximoHorario: "21:40",
    tipo: "intermunicipais",
  },
];

export function ListaResultadosBusca({
  filtroCategoria,
  textoBusca,
  listaFavoritosIds,
  aoAlternarFavorito,
  aoClicarNaRota,
}: ListaResultadosBuscaProps) {
  const [mostrarTudo, setMostrarTudo] = useState(false);

  const rotasFiltradas = ROTAS_FICTICIAS.filter((rota) => {
    const atendeCategoria =
      filtroCategoria === "todas" || rota.tipo === filtroCategoria;
    const atendeBusca = rota.destino
      .toLowerCase()
      .includes(textoBusca.toLowerCase());
    return atendeCategoria && atendeBusca;
  });

  const dadosExibidos = mostrarTudo
    ? rotasFiltradas
    : rotasFiltradas.slice(0, 4);
  const rotasRestantes = rotasFiltradas.length - dadosExibidos.length;

  const renderCardRota = ({ item }: { item: RotaResultadoProps }) => {
    // Verifica se o ID desta rota consta na lista global de favoritos transmitida pela Home
    const isFavorito = listaFavoritosIds.includes(item.id);

    return (
      <Pressable
        onPress={() => aoClicarNaRota?.(item)}
        className="w-full bg-white border border-[#3F5CC4] rounded-[24px] p-5 flex-row items-center mb-3 active:opacity-95"
      >
        <View className="w-16 h-16 bg-[#E8EBFB] rounded-2xl items-center justify-center mr-4">
          <Ionicons name="bus" size={28} color="#000000" />
        </View>

        <View className="flex-1 justify-center">
          <Text
            style={{ fontFamily: fonts.bold }}
            className="text-[#0F172A] text-lg mb-0.5"
          >
            {item.destino}
          </Text>
          <Text
            style={{ fontFamily: fonts.regular }}
            className="text-[#64748B] text-sm mb-1.5"
          >
            {item.origem}
          </Text>
          <Text
            style={{ fontFamily: fonts.medium }}
            className="text-[#334155] text-sm"
          >
            Próximo as {item.proximoHorario}
          </Text>
        </View>

        {/* Aciona o gatilho passando o ID e Destino para a Home decidir o que fazer */}
        <Pressable
          onPress={() => aoAlternarFavorito(item.id, item.destino)}
          className="p-2 active:scale-110"
        >
          <Ionicons
            name={isFavorito ? "heart" : "heart-outline"}
            size={24}
            color={isFavorito ? "#EF4444" : "#64748B"}
          />
        </Pressable>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={dadosExibidos}
      renderItem={renderCardRota}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListFooterComponent={() =>
        !mostrarTudo && rotasRestantes > 0 ? (
          <View className="w-full items-center mt-2 mb-6">
            <Pressable
              onPress={() => setMostrarTudo(true)}
              className="bg-[#E2E8F0] px-5 py-2.5 rounded-full"
            >
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-[#334155] text-xs uppercase tracking-wider"
              >
                {rotasRestantes + dadosExibidos.length} linhas disponíveis
              </Text>
            </Pressable>
          </View>
        ) : null
      }
    />
  );
}
