import { CarrosselRotas } from "@/components/CarrosselRotas";
import { FiltroBusca, TipoLinhaOpcoes } from "@/components/FiltroBusca";
import { HomeHeader } from "@/components/HomeHeader";
import { ListaResultadosBusca } from "@/components/ListaResultadosBusca";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import {
  FiltroOpcoes,
  ProximasSaidas,
} from "@/components/proximasSaidasFiltro";
import { RotasFavoritas } from "@/components/RotasFavoritas";
import { Screen } from "@/components/safearea";
import { SearchBar } from "@/components/searchBar";
import { TituloFiltro } from "@/components/TituloFiltro";
import { ToastNotificacao } from "@/components/ToastNotificacao";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { useAuth } from "@/context/AuthProvider";
import { useFavoritos } from "@/context/FavoritosProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, ScrollView, TextInput, View } from "react-native";

export default function Inicial() {
  const router = useRouter();
  const searchBarRef = useRef<TextInput>(null);

  const [busca, setBusca] = useState("");
  const [filtroSelecionado, setFiltroSelecionado] =
    useState<FiltroOpcoes>("rodoviaria");
  const [filtroBuscaAtivo, setFiltroBuscaAtivo] =
    useState<TipoLinhaOpcoes>("todas");
  const [estaBuscando, setEstaBuscando] = useState(false);
  const [rotaEmDestaque, setRotaEmDestaque] = useState<string | null>(null);

  const normalizar = (t: string) =>
    t
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const [historicoIds, setHistoricoIds] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  // 🚀 PARÂMETRO E ESTADO DO TOAST DE LOGIN
  const { boasVindas } = useLocalSearchParams();
  const [toast, setToast] = useState<{
    mensagem: string;
    tipo: "sucesso" | "erro";
    mostrar: boolean;
  }>({
    mensagem: "",
    tipo: "sucesso",
    mostrar: false,
  });

  useEffect(() => {
    if (boasVindas === "true") {
      setToast({
        mensagem: "Login efetuado com sucesso!",
        tipo: "sucesso",
        mostrar: true,
      });

      // 🧹 Remove o parâmetro 'boasVindas' da rota para que NÃO volte a aparecer ao voltar para esta tela
      router.setParams({ boasVindas: undefined });
    }
  }, [boasVindas]);

  useEffect(() => {
    if (busca.length > 0) {
      const resultados = ROTAS_MOCK.filter((r) =>
        normalizar(r.destino).includes(normalizar(busca)),
      );

      if (resultados.length === 1) {
        setRotaEmDestaque(resultados[0].id);
      } else {
        setRotaEmDestaque(null);
      }
    } else {
      setRotaEmDestaque(null);
    }
  }, [busca]);

  const {
    meusFavoritos,
    listaFavoritosIds,
    alternarFavorito,
    limparFavoritos,
  } = useFavoritos();
  const { usuarioLogado } = useAuth();

  const rotasFavoritasCompletas = useMemo(() => {
    return meusFavoritos
      .map((fav) => ROTAS_MOCK.find((r) => r.id === fav.id))
      .filter((r): r is NonNullable<typeof r> => !!r);
  }, [meusFavoritos]);

  const finalizarBusca = useCallback(() => {
    if (rotaEmDestaque) {
      setHistoricoIds((prev) => [
        rotaEmDestaque,
        ...prev.filter((i) => i !== rotaEmDestaque),
      ]);
    }

    searchBarRef.current?.blur();
    setBusca("");
    setEstaBuscando(false);
    setFiltroBuscaAtivo("todas");
    setRotaEmDestaque(null);
  }, [rotaEmDestaque]);

  const handleNavegacaoFooter = useCallback(
    (aba: TabOpcoes) => {
      if (aba === "home") {
        if (estaBuscando) finalizarBusca();
        return;
      }

      if (estaBuscando) finalizarBusca();

      if (aba === "favoritas") router.push("/favoritos");
      if (aba === "perfil") router.push("/perfil");
    },
    [estaBuscando, finalizarBusca],
  );

  useEffect(() => {
    if (!usuarioLogado) limparFavoritos();
  }, [usuarioLogado]);

  const handleSelecionarRota = useCallback(
    (id: string) => {
      setHistoricoIds((prev) => [id, ...prev.filter((i) => i !== id)]);
      finalizarBusca();
      router.push(`/horarios/${id}`);
    },
    [finalizarBusca],
  );

  const handleAlternarFavoritoClick = useCallback(
    (id: string, destino: string) => {
      const jaEhFavorito = listaFavoritosIds.includes(id);

      const titulo = jaEhFavorito
        ? "Remover dos Favoritos"
        : "Adicionar aos Favoritos";
      const mensagem = jaEhFavorito
        ? `Deseja remover a linha ${destino} dos seus favoritos?`
        : `Deseja adicionar a linha ${destino} aos seus favoritos?`;

      Alert.alert(titulo, mensagem, [
        { text: "Não", style: "cancel" },
        {
          text: "Sim, confirmar",
          onPress: () => alternarFavorito(id, destino),
        },
      ]);
    },
    [alternarFavorito, listaFavoritosIds],
  );

  const handleAdicionarFavorita = useCallback(() => {
    if (!usuarioLogado) router.push("/SolicitarConta");
    else {
      setEstaBuscando(true);
      setTimeout(() => searchBarRef.current?.focus(), 100);
    }
  }, [usuarioLogado]);

  return (
    <View className="flex-1 bg-white">
      <Screen>
        {/* TOAST DE NOTIFICAÇÃO (Posicionado em cima de forma flutuante) */}
        <View className="absolute top-12 left-4 right-4 z-50">
          <ToastNotificacao
            mensagem={toast.mensagem}
            tipo={toast.tipo}
            mostrar={toast.mostrar}
            aoFechar={() => setToast((prev) => ({ ...prev, mostrar: false }))}
          />
        </View>

        <View className="flex-1 px-4 pb-2">
          <HomeHeader subtitulo="Qual o seu destino de hoje ?" />
          <SearchBar
            inputRef={searchBarRef}
            value={busca}
            onFocus={() => setEstaBuscando(true)}
            onChangeText={(txt) => {
              setBusca(txt);
              if (txt.length === 0) setEstaBuscando(true);
            }}
            aoLimpar={() => finalizarBusca()}
          />

          {estaBuscando ? (
            <View className="flex-1 mt-4">
              <FiltroBusca
                filtroAtivo={filtroBuscaAtivo}
                aoMudarFiltro={setFiltroBuscaAtivo}
              />
              <TituloFiltro filtroAtivo={filtroBuscaAtivo} />
              <ListaResultadosBusca
                filtroCategoria={filtroBuscaAtivo}
                textoBusca={busca}
                listaFavoritosIds={listaFavoritosIds}
                aoAlternarFavorito={handleAlternarFavoritoClick}
                aoClicarNaRota={(rota) => handleSelecionarRota(rota.id)}
              />
            </View>
          ) : (
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
              <ProximasSaidas
                filtroAtivo={filtroSelecionado}
                aoMudarFiltro={setFiltroSelecionado}
              />

              <CarrosselRotas
                filtro={
                  filtroSelecionado === "rodoviaria" ? "origem" : "destino"
                }
                historicoIds={historicoIds}
                rotaEmDestaqueId={rotaEmDestaque}
              />

              <RotasFavoritas
                estaLogado={!!usuarioLogado}
                rotasFavoritas={rotasFavoritasCompletas}
                filtroOrigem={filtroSelecionado}
                aoClicarAdicionarFavorita={handleAdicionarFavorita}
                aoClicarNaRota={(rota) => router.push(`/horarios/${rota.id}`)}
              />
            </ScrollView>
          )}
        </View>
        <MenuFooter abaAtiva="home" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
