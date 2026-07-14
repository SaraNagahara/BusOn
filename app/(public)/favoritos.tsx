import { fonts } from "@/app/_layout";
import { FiltroBusca, TipoLinhaOpcoes } from "@/components/FiltroBusca";
import { HomeHeader } from "@/components/HomeHeader";
import { ListaResultadosBusca } from "@/components/ListaResultadosBusca";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { SearchBar } from "@/components/searchBar";
import { TituloFiltro } from "@/components/TituloFiltro";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { useAuth } from "@/context/AuthProvider";
import { useFavoritos } from "@/context/FavoritosProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react"; // ⚡ Importado useCallback
import {
  Alert,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Favoritos() {
  const router = useRouter();
  const searchBarRef = useRef<TextInput>(null);

  const [busca, setBusca] = useState("");
  const [filtroBuscaAtivo, setFiltroBuscaAtivo] =
    useState<TipoLinhaOpcoes>("todas");
  const { usuarioLogado } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [rotaSelecionadaId, setRotaSelecionadaId] = useState<string | null>(
    null,
  );
  const [rotaSelecionadaNome, setRotaSelecionadaNome] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null,
  );
  const [diasSelecionados, setDiasSelecionados] = useState<string[]>([]);
  const [alertaSelecionadoId, setAlertaSelecionadoId] = useState<string | null>(
    null,
  );

  const [direcaoAlerta, setDirecaoAlerta] = useState<"origem" | "destino">(
    "origem",
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

  // ⚡ OTIMIZAÇÃO 1: Evita recriação ao favoritar/desfavoritar
  const handleAlternarFavorito = useCallback(
    (id: string, destino: string) => {
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
    },
    [listaFavoritosIds, alternarFavorito],
  );

  // ⚡ OTIMIZAÇÃO 2: Memorizada função de navegação do Footer
  const handleNavegacaoFooter = useCallback(
    (aba: TabOpcoes) => {
      if (aba === "home") router.push("/inicial");
      if (aba === "perfil") router.push("/perfil");
    },
    [router],
  );

  // ⚡ OTIMIZAÇÃO 3: Isolando a lógica de remoção em lote para o useCallback
  const exibirAlertaRemocao = useCallback(
    (idRota: string, destino: string) => {
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
    },
    [meusAlertas, removerAlertaPorId],
  );

  // ⚡ OTIMIZAÇÃO 4: Abertura do modal ultraveloz travando renderizações inúteis
  const handleAbrirConfigurarAlerta = useCallback(
    (idRota: string, destino: string, idAlerta: string | null) => {
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
        const alertaExistente = meusAlertas.find(
          (a) => a.idAlerta === idAlerta,
        );

        // Adicionado aqui: setar a direção que estava salva
        setDirecaoAlerta(
          (alertaExistente?.direcao as "origem" | "destino") || "origem",
        );
        setHorarioSelecionado(alertaExistente?.horario || null);
        setDiasSelecionados(
          alertaExistente?.dias || ["seg", "ter", "qua", "qui", "sex"],
        );
      } else {
        // Valores padrão para um novo alerta
        setDirecaoAlerta("origem");
        setHorarioSelecionado(null);
        setDiasSelecionados(["seg", "ter", "qua", "qui", "sex"]);
      }

      setModalVisible(true);
    },
    [meusAlertas, exibirAlertaRemocao],
  );

  const handleAlternarDia = (idDia: string) => {
    if (diasSelecionados.includes(idDia)) {
      setDiasSelecionados((prev) => prev.filter((d) => d !== idDia));
    } else {
      setDiasSelecionados((prev) => [...prev, idDia]);
    }
  };

  const handleSalvarAlerta = () => {
    if (!rotaSelecionadaId) return;

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
      rotaSelecionadaId, // 1. idRota
      horarioSelecionado || "", // 2. horario (garantindo string)
      diasSelecionados, // 3. dias
      direcaoAlerta || "origem", // 4. direcao (o novo parâmetro obrigatório)
      alertaSelecionadoId, // 5. idAlertaExistente
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

  const horariosDisponiveis = useMemo(() => {
    if (!rotaSelecionadaId) return [];

    const rota = ROTAS_MOCK.find((r) => String(r.id) === rotaSelecionadaId);
    if (!rota) return [];

    // Filtra os horários baseados na direção escolhida pelo usuário
    return rota.horarios.flatMap((bloco) =>
      bloco.itens
        .filter((item) => item.direcao === direcaoAlerta) // Filtro pela direção
        .map((item) => item.hora),
    );
  }, [rotaSelecionadaId, direcaoAlerta]); // Adicionado direcaoAlerta como dependência

  const DIAS_SEMANA_MOCK = [
    { label: "S", id: "seg" },
    { label: "T", id: "ter" },
    { label: "Q", id: "qua" },
    { label: "Q", id: "qui" },
    { label: "S", id: "sex" },
    { label: "S", id: "sab" },
    { label: "D", id: "dom" },
  ];

  const [historicoIds, setHistoricoIds] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  const favoritosFiltrados = useMemo(() => {
    return ROTAS_MOCK.filter((rota) => {
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
  }, [busca, filtroBuscaAtivo, listaFavoritosIds]);

  const handleSelecionarRota = useCallback((id: string) => {
    setHistoricoIds((prev) => [id, ...prev.filter((i) => i !== id)]);

    router.push(`/horarios/${id}`);
  }, []);

  const rotaAtual = useMemo(() => {
    return ROTAS_MOCK.find((r) => String(r.id) === rotaSelecionadaId);
  }, [rotaSelecionadaId]);

  return (
    <View className="flex-1 bg-white">
      <Screen>
        {/* 🛠️ SOLUÇÃO DO CORTE: Tiramos o pb-28 daqui para permitir que o container ocupe a tela inteira */}
        <View className="flex-1 px-4">
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

          <View className="flex-1 mt-4">
            {favoritosFiltrados.length === 0 ? (
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingBottom: 100, // ⚡ Garante espaçamento mesmo na tela vazia
                }}
                showsVerticalScrollIndicator={false}
                className="px-6"
              >
                <Text
                  style={{ fontFamily: fonts.medium }}
                  className="text-[#64748B] text-base text-center leading-relaxed"
                >
                  {listaFavoritosIds.length === 0
                    ? "Nenhuma rota salva nos favoritos."
                    : "Nenhum resultado encontrado."}
                  {usuarioLogado === false &&
                    "\n\nPara criar sua lista de favoritos, é necessário realizar o login. Clique no botão abaixo para acessar a página de login."}
                </Text>

                {usuarioLogado === false && (
                  <View className="w-full items-center">
                    <View className="h-6" />
                    <Pressable
                      onPress={() => router.push("/loginCadastro")}
                      className="flex-row items-center justify-center border border-slate-300 px-6 py-3 rounded-xl active:bg-slate-50 w-full max-w-[280px]"
                    >
                      <Ionicons
                        name="log-in-outline"
                        size={18}
                        color="#3F5CC4"
                      />
                      <Text
                        style={{ fontFamily: fonts.medium }}
                        className="text-[#3F5CC4] text-sm ml-2"
                      >
                        Acessar página de login
                      </Text>
                    </Pressable>
                  </View>
                )}
              </ScrollView>
            ) : (
              <View className="flex-1">
                {/* ⚡ Passamos o padding diretamente para a rolagem interna do FlatList. 
                    Dessa forma os cards passam por baixo do MenuFooter de forma fluida sem nunca cortar! */}
                <ListaResultadosBusca
                  filtroCategoria={filtroBuscaAtivo}
                  textoBusca={busca}
                  listaFavoritosIds={listaFavoritosIds}
                  aoAlternarFavorito={handleAlternarFavorito}
                  apenasFavoritos={true}
                  aoClicarNoAlerta={handleAbrirConfigurarAlerta}
                  aoClicarNaRota={(rota) => handleSelecionarRota(rota.id)}
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
              {/* Seletor de Direção */}
              {rotaAtual && (
                <>
                  <Text
                    style={{ fontFamily: fonts.bold }}
                    className="text-xs text-slate-400 uppercase tracking-widest mb-3"
                  >
                    Saindo de:
                  </Text>

                  <View className="flex-row gap-2 mb-6">
                    <Pressable
                      onPress={() => {
                        setDirecaoAlerta("origem");
                        setHorarioSelecionado(null);
                      }}
                      className={`flex-1 py-3 rounded-xl border items-center justify-center ${
                        direcaoAlerta === "origem"
                          ? "bg-[#3F5CC4] border-[#3F5CC4]"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <Text
                        style={{ fontFamily: fonts.bold }}
                        className={
                          direcaoAlerta === "origem"
                            ? "text-white"
                            : "text-slate-600"
                        }
                      >
                        Rodoviária
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        setDirecaoAlerta("destino");
                        setHorarioSelecionado(null);
                      }}
                      className={`flex-1 py-3 rounded-xl border items-center justify-center ${
                        direcaoAlerta === "destino"
                          ? "bg-[#3F5CC4] border-[#3F5CC4]"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <Text
                        style={{ fontFamily: fonts.bold }}
                        className={
                          direcaoAlerta === "destino"
                            ? "text-white"
                            : "text-slate-600"
                        }
                      >
                        {rotaAtual.destino}
                      </Text>
                    </Pressable>
                  </View>
                </>
              )}
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xs text-slate-400 uppercase tracking-widest mb-3"
              >
                Horário de partida
              </Text>

              <View className="flex-row flex-wrap gap-2 mb-6">
                {horariosDisponiveis.map((hr) => {
                  // ⚡ Alterado aqui
                  const selecionado = hr === horarioSelecionado;
                  return (
                    <Pressable
                      key={hr}
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
