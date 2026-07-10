import AlternadorSentido, { SentidoTipo } from "@/components/AlternadorSentido";
import FiltroHorarioOpcional, {
  OperacaoItem,
  PeriodoItem,
} from "@/components/FiltroHorarioOpcional";
import HeaderLinhaSelecionada from "@/components/HeaderLinhaSelecionada";
import { ListaHorariosDaRotaSelecionada } from "@/components/ListaHorariosDaRotaSelecionada";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TodosHorariosDaRotaSelecionada() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // AJUSTE: Extrai o ID original caso venha com o prefixo "auto_" da busca recente
  const idReal = String(id).startsWith("auto_")
    ? String(id).split("_")[1]
    : String(id);

  // Busca a rota correta usando o ID tratado
  const rota = ROTAS_MOCK.find((r) => String(r.id) === idReal);

  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [sentidoAtual, setSentidoAtual] = useState<SentidoTipo>("rodoviaria");

  const [dadosOperacao] = useState<OperacaoItem[]>([
    { id: "op_1", label: "Seg - Sáb" },
    { id: "op_2", label: "Dom / Fer" },
  ]);

  const [dadosPeriodos] = useState<PeriodoItem[]>([
    { id: "p_1", label: "06:00 - 09:00" },
    { id: "p_2", label: "09:00 - 12:00" },
    { id: "p_3", label: "12:00 - 18:00" },
    { id: "p_4", label: "18:00 - 22:00" },
    { id: "p_5", label: "22:00 - 01:00" },
  ]);

  if (!rota) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text>Rota não encontrada.</Text>
        </View>
      </Screen>
    );
  }

  const handleAplicarFiltro = (operacaoId: string, periodoId: string) => {
    console.log("Aplicando filtros:", { operacaoId, periodoId });
  };

  const handleMudarAba = (aba: TabOpcoes) => {
    if (aba === "home") router.push("/(public)/inicial");
    else if (aba === "favoritas") router.push("/(public)/favoritos");
    else if (aba === "perfil") router.push("/(public)/perfil");
  };

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
        <ListaHorariosDaRotaSelecionada dados={rota.horarios} />
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
              operacoesDisponiveis={dadosOperacao}
              periodosDisponiveis={dadosPeriodos}
              onSelecionarFiltros={handleAplicarFiltro}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      <MenuFooter abaAtiva={"" as any} aoMudarAba={handleMudarAba} />
    </Screen>
  );
}
