import AlternadorSentido, { SentidoTipo } from "@/components/AlternadorSentido";
import FiltroHorarioOpcional, { OperacaoItem, PeriodoItem } from "@/components/FiltroHorarioOpcional";
import HeaderLinhaSelecionada from "@/components/HeaderLinhaSelecionada";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

export default function TodosHorariosDaRotaSelecionada() {
  const router = useRouter();

  // 👁️ Estado para controlar se o Modal do filtro está visível
  const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);
  const [sentidoAtual, setSentidoAtual] = useState<SentidoTipo>("rodoviaria");
  
  const [bairroDaRota] = useState("Canguera"); 

  const [dadosOperacao] = useState<OperacaoItem[]>([
    { id: "op_1", label: "Seg - Sáb" },
    { id: "op_2", label: "Dom / Fer" }
  ]);

  const [dadosPeriodos] = useState<PeriodoItem[]>([
    { id: "p_1", label: "06:00 - 09:00" },
    { id: "p_2", label: "09:00 - 12:00" },
    { id: "p_3", label: "12:00 - 18:00" },
    { id: "p_4", label: "18:00 - 22:00" },
    { id: "p_5", label: "22:00 - 01:00" }
  ]);

  const handleAplicarFiltro = (operacaoId: string, periodoId: string) => {
    console.log("Aplicando filtros na listagem:", { operacaoId, periodoId });
    // Opcional: Se quiser que o pop-up feche sozinho assim que o usuário escolher um período:
    // setModalFiltroVisivel(false);
  };

  const handleMudarAba = (aba: TabOpcoes) => {
    if (aba === "home") router.push("/inicial");
    else if (aba === "favoritas") router.push("/favoritos");
    else if (aba === "perfil") router.push("/perfil");
  };

  const handleMudancaSentido = (sentido: SentidoTipo) => {
    setSentidoAtual(sentido);
  };

  return (
    <Screen>
      <ScrollView 
        className="flex-1 bg-[#F8FAFC]" 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🌟 CABEÇALHO: Clicar no botão azul agora abre o Modal */}
        <HeaderLinhaSelecionada 
          numeroLinha="11" 
          nomeDestino={bairroDaRota} 
          onPressFiltro={() => setModalFiltroVisivel(true)}
        />

        {/* 🔄 PÍLULA DE SENTIDO */}
        <View className="mt-2 mb-4">
          <AlternadorSentido 
            labelDestino={bairroDaRota} 
            onMudarSentido={handleMudancaSentido} 
          />
        </View>

        {/* 🚌 Seus cards ou tabelas com a lista de horários entram aqui embaixo (eles não vão mais descer!) */}

      </ScrollView>

      {/* 📋 POP-UP CUSTOMIZADO DO FILTRO */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalFiltroVisivel}
        onRequestClose={() => setModalFiltroVisivel(false)}
      >
        {/* Container que escurece o fundo. Se clicar fora do filtro, ele fecha */}
        <TouchableOpacity 
          className="flex-1 bg-black/50 justify-center items-center px-6"
          activeOpacity={1}
          onPressOut={() => setModalFiltroVisivel(false)}
        >
          {/* Evita que cliques de seleção fechem o modal por engano */}
          <View className="w-full max-w-[360px]" onStartShouldSetResponder={() => true}>
            <FiltroHorarioOpcional 
              operacoesDisponiveis={dadosOperacao}
              periodosDisponiveis={dadosPeriodos}
              onSelecionarFiltros={handleAplicarFiltro}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Rodapé fixado */}
      <MenuFooter abaAtiva={"" as any} aoMudarAba={handleMudarAba} />
    </Screen>
  );
}