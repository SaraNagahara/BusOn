import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

import AlternadorSentido, { SentidoTipo } from "@/components/AlternadorSentido";
import FiltroHorarioOpcional, {
  OperacaoItem,
  PeriodoItem,
} from "@/components/FiltroHorarioOpcional";
import HeaderLinhaSelecionada from "@/components/HeaderLinhaSelecionada";
import { ListaHorariosDaRotaSelecionada } from "@/components/ListaHorariosDaRotaSelecionada";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { BlocoHorarios, ROTAS_MOCK } from "@/constants/rotasDados";

export default function TodosHorariosDaRotaSelecionada() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const idReal = String(id).startsWith("auto_")
    ? String(id).split("_")[1]
    : String(id);
  const rota = ROTAS_MOCK.find((r) => String(r.id) === idReal);

  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [sentidoAtual, setSentidoAtual] = useState<SentidoTipo>("rodoviaria");

  // Estado para armazenar os horários que estão sendo exibidos (inicia com todos)
  const [horariosParaExibir, setHorariosParaExibir] = useState<BlocoHorarios[]>(
    rota?.horarios || [],
  );

  // Filtros dinâmicos baseados no JSON
  const operacoesDisponiveis: OperacaoItem[] = useMemo(() => {
    const lista = rota
      ? rota.horarios.map((bloco, index) => ({
          id: index.toString(),
          label: bloco.titulo,
        }))
      : [];
    return [{ id: "todos", label: "Todas Operações" }, ...lista];
  }, [rota]);

  const periodosDisponiveis: PeriodoItem[] = [
    { id: "todos", label: "Dia Todo" },
    { id: "matutino", label: "Matutino" },
    { id: "vespertino", label: "Vespertino" },
    { id: "noturno", label: "Noturno" },
  ];

  const handleAplicarFiltro = (operacaoId: string, periodoId: string) => {
    if (!rota) return;

    const resultado: BlocoHorarios[] = rota.horarios
      // 1. Filtra os blocos (Operações)
      .filter((_, index) => {
        if (operacaoId === "todos") return true;
        return index.toString() === operacaoId;
      })
      // 2. Transforma (Mapeia) para filtrar os itens internos (Períodos)
      .map((bloco) => {
        const itensFiltrados = bloco.itens.filter((item) => {
          if (periodoId === "todos") return true;

          const hora = parseInt(item.hora.split(":")[0]);

          if (periodoId === "matutino") return hora >= 5 && hora < 12;
          if (periodoId === "vespertino") return hora >= 12 && hora < 18;
          if (periodoId === "noturno") return hora >= 18 || hora < 5; // Ajustei para 5h, que é um padrão comum

          return true;
        });

        return {
          titulo: bloco.titulo,
          itens: itensFiltrados,
        };
      })
      // 3. Remove blocos que ficaram vazios após o filtro de período
      .filter((bloco) => bloco.itens.length > 0);

    setHorariosParaExibir(resultado);
    setModalFiltroVisivel(false);
  };
  const handleMudarAba = (aba: TabOpcoes) => {
    if (aba === "home") router.push("/(public)/inicial");
    else if (aba === "favoritas") router.push("/(public)/favoritos");
    else if (aba === "perfil") router.push("/(public)/perfil");
  };

  if (!rota) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text>Rota não encontrada.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View className="px-6 pb-4">
        <HeaderLinhaSelecionada
          numeroLinha={rota.numeroLinha}
          nomeDestino={rota.destino}
          onPressFiltro={() => setModalFiltroVisivel(true)}
        />
        <View className="mt-2 mb-2">
          <AlternadorSentido
            labelDestino={rota.destino}
            onMudarSentido={setSentidoAtual}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <ListaHorariosDaRotaSelecionada dados={horariosParaExibir} />
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalFiltroVisivel}
        onRequestClose={() => setModalFiltroVisivel(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center px-6"
          activeOpacity={1}
          onPressOut={() => setModalFiltroVisivel(false)}
        >
          <View
            className="w-full max-w-[360px]"
            onStartShouldSetResponder={() => true}
          >
            <FiltroHorarioOpcional
              operacoesDisponiveis={operacoesDisponiveis}
              periodosDisponiveis={periodosDisponiveis}
              onSelecionarFiltros={handleAplicarFiltro}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <MenuFooter abaAtiva={"" as any} aoMudarAba={handleMudarAba} />
    </Screen>
  );
}
