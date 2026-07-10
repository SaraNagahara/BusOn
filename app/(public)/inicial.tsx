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

  // Estado de IDs para o histórico de busca
  const [historicoIds, setHistoricoIds] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
  ]);

  const {
    meusFavoritos,
    listaFavoritosIds,
    alternarFavorito,
    limparFavoritos,
  } = useFavoritos();
  const { usuarioLogado } = useAuth();

  const handleNavegacaoFooter = useCallback(
    (aba: TabOpcoes) => {
      if (aba === "home") {
        if (estaBuscando) handleSairDaBusca();
        return;
      }
      if (aba === "favoritas") router.push("/favoritos");
      if (aba === "perfil") router.push("/perfil");
    },
    [estaBuscando],
  );

  useEffect(() => {
    if (!usuarioLogado) limparFavoritos();
  }, [usuarioLogado]);

  // Função para salvar no histórico ao clicar na rota
  const handleSelecionarRota = useCallback((id: string) => {
    setHistoricoIds((prev) => [id, ...prev.filter((i) => i !== id)]);
    handleSairDaBusca();
    router.push(`/horarios/${id}`);
  }, []);

  const favoritosFiltrados = useMemo(() => {
    return meusFavoritos.map((rota) => ({
      id: rota.id,
      destino: rota.destino,
      horario:
        filtroSelecionado === "rodoviaria"
          ? rota.horarioRodoviaria
          : rota.horarioDestino,
    }));
  }, [meusFavoritos, filtroSelecionado]);

  const handleAlternarFavoritoClick = useCallback(
    (id: string, destino: string) => {
      Alert.alert(
        "Favoritos",
        `Deseja alternar o status da linha ${destino}?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Confirmar", onPress: () => alternarFavorito(id, destino) },
        ],
      );
    },
    [alternarFavorito],
  );

  const handleAdicionarFavorita = useCallback(() => {
    if (!usuarioLogado) router.push("/SolicitarConta");
    else {
      setEstaBuscando(true);
      setTimeout(() => searchBarRef.current?.focus(), 100);
    }
  }, [usuarioLogado]);

  const handleSairDaBusca = useCallback(() => {
    searchBarRef.current?.blur();
    setBusca("");
    setEstaBuscando(false);
    setFiltroBuscaAtivo("todas");
  }, []);

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
              if (txt.length === 0) setEstaBuscando(true); // Garante que se apagar tudo, continua buscando
            }}
            // 👈 AJUSTE AQUI: Use a função handleSairDaBusca, não apenas setEstaBuscando(false)
            aoLimpar={() => handleSairDaBusca()}
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
                // Ajustado para disparar a função de histórico ao clicar
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
                filtro={filtroSelecionado}
                historicoIds={historicoIds}
              />

              <RotasFavoritas
                estaLogado={!!usuarioLogado}
                rotasFavoritas={favoritosFiltrados}
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
