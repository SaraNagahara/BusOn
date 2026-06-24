import { FiltroBusca, TipoLinhaOpcoes } from "@/components/FiltroBusca";
import { HomeHeader } from "@/components/HomeHeader";
import { ListaResultadosBusca } from "@/components/ListaResultadosBusca";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { SearchBar } from "@/components/searchBar";
import { TituloFiltro } from "@/components/TituloFiltro";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { useFavoritos } from "@/context/FavoritosProvider";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

//Adicionar filtro de horario tbm? ou retirar o horario mostrando so as rotas da pessoa?

export default function Favoritos() {
  const router = useRouter();
  const searchBarRef = useRef<TextInput>(null);

  const [busca, setBusca] = useState("");
  const [filtroBuscaAtivo, setFiltroBuscaAtivo] =
    useState<TipoLinhaOpcoes>("todas");

  const [usuarioLogado, setUsuarioLogado] = useState(true);

  // CONTEXTO GLOBAL DE FAVORITOS 👈
  const { listaFavoritosIds, alternarFavorito, limparFavoritos } =
    useFavoritos();

  useEffect(() => {
    if (!usuarioLogado) {
      limparFavoritos();
    }
  }, [usuarioLogado]);

  // AJUSTE: Agora altera usando o estado global do Provider 👈
  const handleAlternarFavorito = (id: string, destino: string) => {
    if (!usuarioLogado) {
      router.push("/SolicitarConta");
      return;
    }
    alternarFavorito(id, destino);
  };

  const handleNavegacaoFooter = (aba: TabOpcoes) => {
    if (aba === "home") router.push("/inicial");
    if (aba === "perfil") router.push("/perfil");
  };

  // Cruza o JSON unificado usando a lista de IDs global
  const favoritosFiltrados = ROTAS_MOCK.filter((rota) => {
    const eFavorito = listaFavoritosIds.includes(rota.id);
    const atendeCategoria =
      filtroBuscaAtivo === "todas" || rota.tipo === filtroBuscaAtivo;

    const termoBusca = busca.toLowerCase();
    const destinoRota = rota.destino.toLowerCase();

    // Mantém a mesma inteligência de busca usada na Home para o São João Novo
    const atendeBusca =
      destinoRota.includes(termoBusca) ||
      (destinoRota.startsWith("s. joão") && termoBusca.startsWith("sao joao"));

    return eFavorito && atendeCategoria && atendeBusca;
  });

  return (
    <View className="flex-1 bg-white">
      <Screen>
        <View className="flex-1 px-4 pb-2">
          <HomeHeader subtitulo="Suas linhas salvas e favoritas" />

          <SearchBar
            inputRef={searchBarRef}
            value={busca}
            onChangeText={(txt) => setBusca(txt)}
            placeholder="Pesquisar nos favoritos..."
          />

          <FiltroBusca
            filtroAtivo={filtroBuscaAtivo}
            aoMudarFiltro={(novoFiltro) => setFiltroBuscaAtivo(novoFiltro)}
          />

          <TituloFiltro filtroAtivo={filtroBuscaAtivo} />

          <View className="flex-1 mt-2">
            {/* CONDICIONAL: Se não houver correspondências favoritadas, mostra o aviso */}
            {favoritosFiltrados.length === 0 ? (
              <View className="flex-1 justify-center items-center px-8">
                <Text className="text-[#64748B] text-base text-center font-medium">
                  {listaFavoritosIds.length === 0
                    ? "Você ainda não possui rotas favoritadas"
                    : "Nenhum favorito encontrado para esta busca"}
                </Text>
              </View>
            ) : (
              <View className="flex-1">
                <ListaResultadosBusca
                  filtroCategoria={filtroBuscaAtivo}
                  textoBusca={busca}
                  listaFavoritosIds={listaFavoritosIds}
                  aoAlternarFavorito={handleAlternarFavorito}
                  aoClicarNaRota={(rota) => {
                    console.log(
                      "Acessou detalhes da favoritada:",
                      rota.destino,
                    );
                  }}
                  apenasFavoritos={true} // 👈 ADICIONADO AQUI PARA ATIVAR O FILTRO OCULTO
                />
              </View>
            )}
          </View>
        </View>

        <MenuFooter abaAtiva="favoritas" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
