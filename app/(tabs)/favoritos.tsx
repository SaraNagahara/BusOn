import { FiltroBusca, TipoLinhaOpcoes } from "@/components/FiltroBusca";
import { HomeHeader } from "@/components/HomeHeader";
import { ListaResultadosBusca } from "@/components/ListaResultadosBusca";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { SearchBar } from "@/components/searchBar";
import { TituloFiltro } from "@/components/TituloFiltro";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { useFavoritos } from "@/context/FavoritosProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { fonts } from "./../_layout";

{
  /*mudar a parte caso n aja login pra uma tela parecida ja com a favoritos  sem ser aquela outra pagina mas solicitando o login algo como para criar sua lista é necessario login e um botao pra pagina de login */
}
export default function Favoritos() {
  const router = useRouter();
  const searchBarRef = useRef<TextInput>(null);

  const [busca, setBusca] = useState("");
  const [filtroBuscaAtivo, setFiltroBuscaAtivo] =
    useState<TipoLinhaOpcoes>("todas");
  const [usuarioLogado, setUsuarioLogado] = useState(true);

  // Estados do Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [rotaSelecionadaId, setRotaSelecionadaId] = useState<string | null>(
    null,
  );
  const [rotaSelecionadaNome, setRotaSelecionadaNome] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null,
  ); // 👈 Começa limpo para obrigar a seleção caso não venha do mock/alerta
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [alertaSelecionadoId, setAlertaSelecionadoId] = useState<string | null>(
    null,
  );

  const {
    listaFavoritosIds,
    meusAlertas,
    alternarFavorito,
    limparFavoritos,
    configurarAlerta,
    removerAlertaPorId,
  } = useFavoritos();

  useEffect(() => {
    if (!usuarioLogado) {
      limparFavoritos();
    }
  }, [usuarioLogado]);

  const handleAlternarFavorito = (id: string, destino: string) => {
    if (!usuarioLogado) {
      router.push("/SolicitarConta");
      return;
    }

    const jaEFavorito = listaFavoritosIds.includes(id);

    if (jaEFavorito) {
      Alert.alert(
        "Remover dos Favoritos",
        `Tem certeza que deseja desfavoritar a linha ${destino}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim, remover",
            style: "destructive",
            onPress: () => alternarFavorito(id, destino),
          },
        ],
      );
    } else {
      Alert.alert(
        "Adicionar aos Favoritos",
        `Deseja favoritar a linha ${destino}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Sim, favoritar",
            style: "default",
            onPress: () => alternarFavorito(id, destino),
          },
        ],
      );
    }
  };

  const handleNavegacaoFooter = (aba: TabOpcoes) => {
    if (aba === "home") router.push("/inicial");
    if (aba === "perfil") router.push("/perfil");
  };

  const handleAbrirConfigurarAlerta = (
    idRota: string,
    destino: string,
    idAlerta: string | null,
  ) => {
    if (idAlerta === "REMOVER_TODOS") {
      exibirAlertaRemocao(idRota, destino);
      return;
    }

    const LIMITE_MAXIMO_ALERTAS = 2;
    if (idAlerta === null && meusAlertas.length >= LIMITE_MAXIMO_ALERTAS) {
      const temAlertaNessaRota = meusAlertas.some((a) => a.idRota === idRota);

      if (temAlertaNessaRota) {
        exibirAlertaRemocao(idRota, destino);
      } else {
        Alert.alert(
          "Limite Atingido",
          "Você já atingiu o limite máximo de alertas salvos no aplicativo. Remova um alerta existente para adicionar este.",
          [{ text: "Entendido", style: "default" }],
        );
      }
      return;
    }

    setRotaSelecionadaId(idRota);
    setRotaSelecionadaNome(destino);
    setAlertaSelecionadoId(idAlerta);

    if (idAlerta) {
      const alertaExistente = meusAlertas.find((a) => a.idAlerta === idAlerta);
      setHorarioSelecionado(alertaExistente?.horario || null); // 👈 Pega o salvo ou deixa nulo para escolha
      setDiasSelecionados(
        alertaExistente?.dias || ["seg", "ter", "qua", "qui", "sex"],
      );
    } else {
      const rotaNoMock = ROTAS_MOCK.find((r) => r.id === idRota);
      setHorarioSelecionado(null);
      setDiasSelecionados(["seg", "ter", "qua", "qui", "sex"]);
    }

    setModalVisible(true);
  };

  const exibirAlertaRemocao = (idRota: string, destino: string) => {
    Alert.alert(
      "Remover Notificações",
      `Deseja desativar todas as notificações da linha ${destino} para liberar espaço?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover Notificações",
          style: "destructive",
          onPress: () => {
            const alertasParaRemover = meusAlertas.filter(
              (a) => a.idRota === idRota,
            );
            alertasParaRemover.forEach((alerta) =>
              removerAlertaPorId(alerta.idAlerta),
            );
          },
        },
      ],
    );
  };

  const handleAlternarDia = (idDia: string) => {
    if (diasSelecionados.includes(idDia)) {
      setDiasSelecionados((prev) => prev.filter((d) => d !== idDia));
    } else {
      setDiasSelecionados((prev) => [...prev, idDia]);
    }
  };

  const handleSalvarAlerta = () => {
    if (!rotaSelecionadaId) return;

    // 👈 Trava estrita: Se não houver horário selecionado, impede o salvamento
    if (!horarioSelecionado) {
      Alert.alert(
        "Horário Obrigatório",
        "Por favor, selecione um horário de partida para a notificação.",
      );
      return;
    }

    if (diasSelecionados.length === 0) {
      Alert.alert(
        "Dias Obrigatórios",
        "Selecione ao menos um dia para a notificação.",
      );
      return;
    }

    const sucesso = configurarAlerta(
      rotaSelecionadaId,
      horarioSelecionado,
      diasSelecionados,
      alertaSelecionadoId,
    );
    if (sucesso) {
      setModalVisible(false);
    }
  };

  const handleRemoverAlerta = () => {
    if (!alertaSelecionadoId) return;
    removerAlertaPorId(alertaSelecionadoId);
    setModalVisible(false);
  };

  const HORARIOS_DISPONIVEIS_MOCK = [
    "06:30",
    "12:15",
    "15:45",
    "18:10",
    "20:15",
    "21:40",
  ];

  const DIAS_SEMANA_MOCK = [
    { label: "S", id: "seg" },
    { label: "T", id: "ter" },
    { label: "Q", id: "qua" },
    { label: "Q", id: "qui" },
    { label: "S", id: "sex" },
    { label: "S", id: "sab" },
    { label: "D", id: "dom" },
  ];

  const favoritosFiltrados = ROTAS_MOCK.filter((rota) => {
    const eFavorito = listaFavoritosIds.includes(rota.id);
    const atendeCategoria =
      filtroBuscaAtivo === "todas" || rota.tipo === filtroBuscaAtivo;
    const termoBusca = busca.toLowerCase();
    const destinoRota = rota.destino.toLowerCase();
    return (
      eFavorito &&
      atendeCategoria &&
      (destinoRota.includes(termoBusca) ||
        (destinoRota.startsWith("s. joão") &&
          termoBusca.startsWith("sao joao")))
    );
  });

  return (
    <View className="flex-1 bg-white">
      <Screen>
        <View className="flex-1 px-4 pb-28">
          <HomeHeader
            titulo="Olá, Fulano"
            subtitulo="Suas linhas salvas e favoritas"
          />

          <SearchBar
            inputRef={searchBarRef}
            value={busca}
            onChangeText={(txt) => setBusca(txt)}
            placeholder="Pesquisar nos favoritos..."
            aoLimpar={() => setBusca("")}
          />

          <FiltroBusca
            filtroAtivo={filtroBuscaAtivo}
            aoMudarFiltro={(f) => setFiltroBuscaAtivo(f)}
          />
          <TituloFiltro filtroAtivo={filtroBuscaAtivo} />

          <View className="flex-1 mt-2">
            {favoritosFiltrados.length === 0 ? (
              <View className="flex-1 justify-center items-center px-8">
                <Text
                  style={{ fontFamily: fonts.medium }}
                  className="text-[#64748B] text-base text-center"
                >
                  {listaFavoritosIds.length === 0
                    ? "Nenhuma rota salva nos favoritos"
                    : "Nenhum resultado encontrado"}
                </Text>
              </View>
            ) : (
              <View className="flex-1">
                <ListaResultadosBusca
                  filtroCategoria={filtroBuscaAtivo}
                  textoBusca={busca}
                  listaFavoritosIds={listaFavoritosIds}
                  aoAlternarFavorito={handleAlternarFavorito}
                  apenasFavoritos={true}
                  aoClicarNoAlerta={handleAbrirConfigurarAlerta}
                />
              </View>
            )}
          </View>
        </View>

        <MenuFooter abaAtiva="favoritas" aoMudarAba={handleNavegacaoFooter} />

        {/* 🔔 MODAL DE CONFIGURAÇÃO DE ALERTAS */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-end bg-black/40">
            <Pressable
              className="absolute inset-0"
              onPress={() => setModalVisible(false)}
            />

            <View
              style={{ paddingBottom: 24 + (Platform.OS === "ios" ? 28 : 28) }}
              className="bg-white rounded-t-[32px] p-6 w-full z-10 shadow-2xl"
            >
              {/* Header do Modal */}
              <View className="flex-row justify-between items-center mb-5">
                <View>
                  <Text
                    style={{ fontFamily: fonts.bold }}
                    className="text-xl text-slate-900"
                  >
                    {alertaSelecionadoId
                      ? "Configurações do Alerta"
                      : "Definir Alerta de Horário"}
                  </Text>
                  <Text
                    style={{ fontFamily: fonts.regular }}
                    className="text-sm text-slate-500"
                  >
                    Linha {rotaSelecionadaNome}
                  </Text>
                </View>
                <Pressable
                  onPress={() => setModalVisible(false)}
                  className="bg-slate-100 p-2 rounded-full"
                >
                  <Ionicons name="close" size={20} color="#64748B" />
                </Pressable>
              </View>

              {/* Horários */}
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xs text-slate-400 uppercase tracking-widest mb-3"
              >
                Horário de partida
              </Text>
              <View className="flex-row flex-wrap gap-2 mb-6">
                {HORARIOS_DISPONIVEIS_MOCK.map((hr) => {
                  const selecionado = hr === horarioSelecionado;
                  return (
                    <Pressable
                      key={hr}
                      // 👈 Lógica corrigida aqui: se já for o selecionado, desmarca virando null
                      onPress={() =>
                        setHorarioSelecionado(selecionado ? null : hr)
                      }
                      className={`px-4 py-2.5 rounded-full border ${
                        selecionado
                          ? "bg-[#3F5CC4] border-[#3F5CC4]"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <Text
                        style={{
                          fontFamily: selecionado ? fonts.bold : fonts.medium,
                        }}
                        className={`text-sm ${selecionado ? "text-white" : "text-slate-700"}`}
                      >
                        {hr}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Dias da Semana */}
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xs text-slate-400 uppercase tracking-widest mb-3"
              >
                Dias de repetição
              </Text>
              <View className="flex-row justify-between mb-8 bg-slate-50 p-2.5 rounded-2xl">
                {DIAS_SEMANA_MOCK.map((dia) => {
                  const estaAtivo = diasSelecionados.includes(dia.id);
                  return (
                    <Pressable
                      key={dia.id}
                      onPress={() => handleAlternarDia(dia.id)}
                      className={`w-10 h-10 rounded-full items-center justify-center ${
                        estaAtivo ? "bg-[#3F5CC4]" : "bg-transparent"
                      }`}
                    >
                      <Text
                        style={{
                          fontFamily: estaAtivo ? fonts.bold : fonts.medium,
                        }}
                        className={`text-sm ${estaAtivo ? "text-white" : "text-slate-500"}`}
                      >
                        {dia.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Botões do Modal */}
              <View className="flex-row gap-3">
                {alertaSelecionadoId !== null && (
                  <Pressable
                    onPress={handleRemoverAlerta}
                    className="flex-1 bg-slate-100 rounded-2xl h-14 flex-row justify-center items-center gap-2 active:bg-slate-200"
                  >
                    <Ionicons name="trash-outline" size={18} color="#475569" />
                    <Text
                      style={{ fontFamily: fonts.bold }}
                      className="text-slate-600 text-base"
                    >
                      Remover
                    </Text>
                  </Pressable>
                )}

                <Pressable
                  onPress={handleSalvarAlerta}
                  className="flex-[2] bg-[#3F5CC4] rounded-2xl h-14 justify-center items-center active:bg-[#344da6]"
                >
                  <Text
                    style={{ fontFamily: fonts.bold }}
                    className="text-white text-base"
                  >
                    {alertaSelecionadoId ? "Atualizar Alerta" : "Ativar Alerta"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </Screen>
    </View>
  );
}
