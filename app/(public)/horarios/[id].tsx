import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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
  const rota = useMemo(
    () => ROTAS_MOCK.find((r) => String(r.id) === idReal),
    [idReal],
  );

  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [sentidoAtual, setSentidoAtual] = useState<SentidoTipo>("origem"); // Ajustado para "origem" conforme seu tipo
  const [horariosParaExibir, setHorariosParaExibir] = useState<BlocoHorarios[]>(
    [],
  );

  // Filtra os itens de cada bloco conforme o sentido selecionado
  useEffect(() => {
    if (!rota) return;

    const horariosFiltrados = rota.horarios
      .map((bloco) => ({
        ...bloco,
        itens: bloco.itens.filter((item) => item.direcao === sentidoAtual),
      }))
      .filter((bloco) => bloco.itens.length > 0);

    setHorariosParaExibir(horariosFiltrados);
  }, [sentidoAtual, rota]);

  const operacoesDisponiveis: OperacaoItem[] = useMemo(() => {
    if (!rota) return [];
    const lista = rota.horarios.map((bloco, index) => ({
      id: index.toString(),
      label: bloco.titulo,
    }));
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

    const resultado = rota.horarios
      .filter(
        (_, index) => operacaoId === "todos" || index.toString() === operacaoId,
      )
      .map((bloco) => ({
        ...bloco,
        // Filtra por sentido E por período simultaneamente
        itens: bloco.itens.filter((item) => {
          const filtroSentido = item.direcao === sentidoAtual;

          if (periodoId === "todos") return filtroSentido;

          const hora = parseInt(item.hora.split(":")[0]);
          let filtroPeriodo = true;
          if (periodoId === "matutino") filtroPeriodo = hora >= 5 && hora < 12;
          else if (periodoId === "vespertino")
            filtroPeriodo = hora >= 12 && hora < 18;
          else if (periodoId === "noturno")
            filtroPeriodo = hora >= 18 || hora < 5;

          return filtroSentido && filtroPeriodo;
        }),
      }))
      .filter((bloco) => bloco.itens.length > 0);

    setHorariosParaExibir(resultado);
    setModalFiltroVisivel(false);
  };

  // ... restante do código (handleMudarAba, render, etc)
  // Certifique-se apenas que o AlternadorSentido envie os valores "origem" ou "destino"
  // para coincidir com o seu tipo no rotasDados.ts
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
