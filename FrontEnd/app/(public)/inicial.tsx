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
import { ROTAS_MOCK } from "@/constants/rotasDados"; // Importe o MOCK
import { useAuth } from "@/context/AuthProvider";
import { useFavoritos } from "@/context/FavoritosProvider";
import { useRouter } from "expo-router";
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

  // Mapeia os favoritos para o formato completo que o RotasFavoritas espera
  const rotasFavoritasCompletas = useMemo(() => {
    return meusFavoritos
      .map((fav) => ROTAS_MOCK.find((r) => r.id === fav.id))
      .filter((r): r is NonNullable<typeof r> => !!r);
  }, [meusFavoritos]);

  const finalizarBusca = useCallback(() => {
    // 1. Promove a rota para o histórico se for um resultado único
    if (rotaEmDestaque) {
      setHistoricoIds((prev) => [
        rotaEmDestaque,
        ...prev.filter((i) => i !== rotaEmDestaque),
      ]);
    }

    // 2. Limpa os estados de busca
    searchBarRef.current?.blur();
    setBusca("");
    setEstaBuscando(false);
    setFiltroBuscaAtivo("todas");
    setRotaEmDestaque(null);
  }, [rotaEmDestaque]);

  const handleNavegacaoFooter = useCallback(
    (aba: TabOpcoes) => {
      if (aba === "home") {
        if (estaBuscando) finalizarBusca(); // Usa a nova função
        return;
      }

      // Se o usuário mudar de aba (ex: para favoritas) enquanto buscava,
      // também finalizamos e salvamos a rota no histórico
      if (estaBuscando) finalizarBusca();

      if (aba === "favoritas") router.push("/favoritos");
      if (aba === "perfil") router.push("/perfil");
    },
    [estaBuscando, finalizarBusca], // Adicionado finalizarBusca como dependência
  );

  useEffect(() => {
    if (!usuarioLogado) limparFavoritos();
  }, [usuarioLogado]);

  const handleSelecionarRota = useCallback(
    (id: string) => {
      // Aqui você já adiciona ao histórico, mas pode usar o finalizarBusca também
      setHistoricoIds((prev) => [id, ...prev.filter((i) => i !== id)]);
      finalizarBusca();
      router.push(`/horarios/${id}`);
    },
    [finalizarBusca],
  );

  const handleAlternarFavoritoClick = useCallback(
    (id: string, destino: string) => {
      // 🔍 Verifica se a rota já está nos favoritos
      const jaEhFavorito = listaFavoritosIds.includes(id);

      // 📝 Define o título e a mensagem com base no estado atual
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
    [alternarFavorito, listaFavoritosIds], // ⚡ Adicionado listaFavoritosIds aqui para atualizar o comportamento sempre que a lista mudar
  );

  const handleAdicionarFavorita = useCallback(() => {
    if (!usuarioLogado) router.push("/SolicitarConta");
    else {
      setEstaBuscando(true);
      setTimeout(() => searchBarRef.current?.focus(), 100);
    }
  }, [usuarioLogado]);

  const handleSairDaBusca = useCallback(() => {
    // SE houver uma rota destacada, salvamos ela no histórico antes de sair
    if (rotaEmDestaque) {
      setHistoricoIds((prev) => {
        // Remove caso já exista e coloca no topo
        const novoHistorico = [
          rotaEmDestaque,
          ...prev.filter((i) => i !== rotaEmDestaque),
        ];
        return novoHistorico.slice(0, 5); // Mantém apenas os 5 mais recentes
      });
    }

    searchBarRef.current?.blur();
    setBusca("");
    setEstaBuscando(false);
    setFiltroBuscaAtivo("todas");
    setRotaEmDestaque(null); // Limpa o destaque
  }, [rotaEmDestaque]);

  return (
    <View className="flex-1 bg-white">
      <Screen>
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
                // Ajuste: tradução interna se necessário ou passe "origem"/"destino" direto
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
