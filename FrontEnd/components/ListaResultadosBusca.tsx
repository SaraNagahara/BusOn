import { fonts } from "@/app/_layout";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useFavoritos } from "../context/FavoritosProvider";
import { TipoLinhaOpcoes } from "./FiltroBusca";

// 🌟 1. FUNÇÃO DE NORMALIZAÇÃO INTEGRADA (Garante que Ç vire C, Ã vire A, etc.)
const normalizarTexto = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

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
  listaFavoritosIds: string[];
  aoAlternarFavorito: (id: string, destino: string) => void;
  aoClicarNaRota?: (rota: RotaResultadoProps) => void;
  apenasFavoritos?: boolean;
  aoClicarNoAlerta?: (
    idRota: string,
    destino: string,
    idAlerta: string | null,
  ) => void;
}

export function ListaResultadosBusca({
  filtroCategoria,
  textoBusca,
  listaFavoritosIds,
  aoAlternarFavorito,
  aoClicarNaRota,
  apenasFavoritos = false,
  aoClicarNoAlerta,
}: ListaResultadosBuscaProps) {
  const [mostrarTudo, setMostrarTudo] = useState(false);
  const { meusAlertas } = useFavoritos();

  const rotasFiltradas = useMemo(() => {
    return ROTAS_MOCK.filter((rota) => {
      if (apenasFavoritos && !listaFavoritosIds.includes(String(rota.id))) {
        return false;
      }

      const atendeCategoria =
        filtroCategoria === "todas" || rota.tipo === filtroCategoria;

      // 🌟 2. NORMALIZAÇÃO DA BUSCA E DO BANCO DE DADOS
      const termoNormalizado = normalizarTexto(textoBusca);
      const destinoNormalizado = normalizarTexto(rota.destino);

      const atendeBusca =
        destinoNormalizado.includes(termoNormalizado) ||
        // Mantém a compatibilidade histórica se escrever "sao joao" vs "s. joão"
        (destinoNormalizado.startsWith("s. joao") &&
          termoNormalizado.startsWith("sao joao"));

      return atendeCategoria && atendeBusca;
    }).map((rota): RotaResultadoProps => {
      // Extrai o primeiro horário disponível como exemplo para o card
      const primeiroBloco = rota.horarios[0];
      const primeiroHorario = primeiroBloco?.itens[0]?.hora || "--:--";

      return {
        id: String(rota.id),
        destino: rota.destino,
        origem: "Terminal de São Roque",
        proximoHorario: primeiroHorario,
        tipo: rota.tipo as TipoLinhaOpcoes,
      };
    });
  }, [filtroCategoria, textoBusca, listaFavoritosIds, apenasFavoritos]);

  const dadosExibidos = useMemo(() => {
    return mostrarTudo ? rotasFiltradas : rotasFiltradas.slice(0, 4);
  }, [mostrarTudo, rotasFiltradas]);

  const rotasRestantes = rotasFiltradas.length - dadosExibidos.length;

  const renderCardRota = ({ item }: { item: RotaResultadoProps }) => {
    const isFavorito = listaFavoritosIds.includes(item.id);
    const alertasDessaRota = meusAlertas.filter(
      (alerta) => alerta.idRota === item.id,
    );

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
            className={`text-[#64748B] text-sm ${!apenasFavoritos ? "mb-1.5" : ""}`}
          >
            {item.origem}
          </Text>

          {!apenasFavoritos && (
            <Text
              style={{ fontFamily: fonts.medium }}
              className="text-[#334155] text-sm"
            >
              Próximo às {item.proximoHorario}
              {" - "}
              <Text
                style={{ fontFamily: fonts.medium }}
                className="text-[#2449AE]/70 text-xs ml-2 uppercase tracking-wide"
              >
                Ver mais
              </Text>
            </Text>
          )}

          {apenasFavoritos && (
            <Text
              style={{ fontFamily: fonts.medium }}
              className="text-[#2449AE]/70 text-sm"
            >
              Ver horários
            </Text>
          )}

          {apenasFavoritos && alertasDessaRota.length > 0 && (
            <View className="flex-row gap-1.5 mt-2 flex-wrap">
              {alertasDessaRota.map((alerta) => (
                <Pressable
                  key={alerta.idAlerta}
                  onPress={() =>
                    aoClicarNoAlerta?.(item.id, item.destino, alerta.idAlerta)
                  }
                  className="bg-amber-100/80 px-3 py-1 rounded-full flex-row items-center gap-1 active:opacity-60"
                >
                  <Ionicons name="notifications" size={12} color="#D97706" />
                  <Text
                    style={{ fontFamily: fonts.bold }}
                    className="text-[#B45309] text-[11px]"
                  >
                    {alerta.horario}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View className="flex-row items-center gap-1">
          {apenasFavoritos && (
            <Pressable
              onPress={() => {
                if (alertasDessaRota.length === 2) {
                  aoClicarNoAlerta?.(item.id, item.destino, "REMOVER_TODOS");
                } else {
                  aoClicarNoAlerta?.(item.id, item.destino, null);
                }
              }}
              className="p-2 active:scale-110"
            >
              <Ionicons
                name={
                  alertasDessaRota.length > 0
                    ? "notifications"
                    : "notifications-outline"
                }
                size={24}
                color={alertasDessaRota.length > 0 ? "#D97706" : "#64748B"}
              />
            </Pressable>
          )}

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
        </View>
      </Pressable>
    );
  };

  const renderFooter = () => {
    if (!mostrarTudo && rotasRestantes > 0) {
      return (
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
      );
    }
    return null;
  };

  return (
    <FlatList
      data={dadosExibidos}
      renderItem={renderCardRota}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListFooterComponent={renderFooter}
      initialNumToRender={4}
      maxToRenderPerBatch={4}
      windowSize={5}
    />
  );
}
