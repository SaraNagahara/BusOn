import { CarrosselRotas } from "@/components/CarrosselRotas";
import { FiltroBusca, TipoLinhaOpcoes } from "@/components/FiltroBusca";
import { HomeHeader } from "@/components/HomeHeader";
import { ListaResultadosBusca } from "@/components/ListaResultadosBusca";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { RotaFavoritaProps, RotasFavoritas } from "@/components/RotasFavoritas";
import { SearchBar } from "@/components/searchBar";
import { TituloFiltro } from "@/components/TituloFiltro";
import { ROTAS_MOCK } from "@/constants/rotasDados";
import { useFavoritos } from "@/context/FavoritosProvider";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, TextInput, View } from "react-native";
import {
  FiltroOpcoes,
  ProximasSaidas,
} from "./../../components/proximasSaidasFiltro";
import { Screen } from "./../../components/safearea";

// 🌐 Função utilitária para obter a data/hora atual convertida estritamente para o Horário de Brasília (UTC-3)
const obterDataBrasilia = (): Date => {
  const agora = new Date();
  const fusoBrasilia =
    agora.getTime() + agora.getTimezoneOffset() * 60000 - 3 * 3600000;
  return new Date(fusoBrasilia);
};

export default function Inicial() {
  const router = useRouter();
  const searchBarRef = useRef<TextInput>(null);

  const [abaAtual, setAbaAtual] = useState<TabOpcoes>("home");
  const [busca, setBusca] = useState("");
  const [filtroSelecionado, setFiltroSelecionado] =
    useState<FiltroOpcoes>("rodoviaria");

  const [filtroBuscaAtivo, setFiltroBuscaAtivo] =
    useState<TipoLinhaOpcoes>("todas");
  const [estaBuscando, setEstaBuscando] = useState(false);

  // CONTEXTO GLOBAL DE FAVORITOS 👈
  const {
    meusFavoritos,
    listaFavoritosIds,
    alternarFavorito,
    limparFavoritos,
  } = useFavoritos();

  // CONTROLE DE LOGIN
  const usuarioLogado = true;

  // GERENCIAMENTO ÚNICO DO FOOTER COM VALIDAÇÃO DE SEGURANÇA
  const handleNavegacaoFooter = (aba: TabOpcoes) => {
    if (aba === "home") {
      if (estaBuscando) {
        handleSairDaBusca();
      }
      return;
    }

    if (!usuarioLogado) {
      router.push({
        pathname: "/SolicitarConta",
        params: { origem: aba },
      });
      return;
    }

    if (aba === "favoritas") router.push("/favoritos");
    if (aba === "perfil") router.push("/perfil");
  };

  useEffect(() => {
    if (!usuarioLogado) {
      limparFavoritos();
    }
  }, [usuarioLogado]);

  // Histórico de buscas do Carrossel (inicia com os padrões)
  const [recentesRodoviaria, setRecentesRodoviaria] = useState<
    RotaFavoritaProps[]
  >([
    { id: "1", destino: "São João novo", horario: "15:30" },
    { id: "2", destino: "Guaçu", horario: "15:55" },
    { id: "3", destino: "Canguera", horario: "15:40" },
    { id: "4", destino: "Mailasqui", horario: "16:15" },
  ]);

  const [recentesDestino, setRecentesDestino] = useState<RotaFavoritaProps[]>([
    { id: "d1", destino: "Sorocaba", horario: "17:00" },
    { id: "d2", destino: "Mairinque", horario: "17:45" },
    { id: "d3", destino: "São Paulo", horario: "18:20" },
    { id: "d4", destino: "Ibiúna", horario: "19:10" },
  ]);

  useEffect(() => {
    if (busca.trim().length === 0) return;

    const rotasFiltradas = ROTAS_MOCK.filter((rota) => {
      const atendeCategoria =
        filtroBuscaAtivo === "todas" || rota.tipo === filtroBuscaAtivo;

      const termoBusca = busca.toLowerCase();
      const destinoRota = rota.destino.toLowerCase();

      const atendeBusca =
        destinoRota.includes(termoBusca) ||
        (destinoRota.startsWith("s. joão") &&
          termoBusca.startsWith("sao joao"));

      return atendeCategoria && atendeBusca;
    });

    if (rotasFiltradas.length === 1) {
      const rotaEncontrada = rotasFiltradas[0];
      const timestampBrasilia = obterDataBrasilia().getTime();

      const novaRotaRecente: RotaFavoritaProps = {
        id: `auto_${rotaEncontrada.id}_${timestampBrasilia}`,
        destino: rotaEncontrada.destino,
        horario: rotaEncontrada.proximoHorario,
      };

      if (filtroSelecionado === "rodoviaria") {
        setRecentesRodoviaria((prev) => {
          const filtrados = prev.filter(
            (item) =>
              item.destino.toLowerCase() !==
              rotaEncontrada.destino.toLowerCase(),
          );
          return [novaRotaRecente, ...filtrados];
        });
      } else {
        setRecentesDestino((prev) => {
          const filtrados = prev.filter(
            (item) =>
              item.destino.toLowerCase() !==
              rotaEncontrada.destino.toLowerCase(),
          );
          return [novaRotaRecente, ...filtrados];
        });
      }
    }
  }, [busca, filtroBuscaAtivo]);

  const favoritosFiltrados: RotaFavoritaProps[] = meusFavoritos.map((rota) => ({
    id: rota.id,
    destino: rota.destino,
    horario:
      filtroSelecionado === "rodoviaria"
        ? rota.horarioRodoviaria
        : rota.horarioDestino,
  }));

  const handleAlternarFavoritoClick = (id: string, destino: string) => {
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

  const handleSelecionarRotaManual = (rota: any) => {
    handleSairDaBusca();
  };

  const handleAdicionarFavorita = () => {
    if (!usuarioLogado) {
      router.push("/SolicitarConta");
    } else {
      setEstaBuscando(true);
      setTimeout(() => {
        searchBarRef.current?.focus();
      }, 100);
    }
  };

  const handleSairDaBusca = () => {
    searchBarRef.current?.blur();
    setBusca("");
    setEstaBuscando(false);
    setFiltroBuscaAtivo("todas");
  };

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
            aoLimpar={() => setEstaBuscando(false)}
          />

          {estaBuscando ? (
            <View className="flex-1 mt-4">
              <FiltroBusca
                filtroAtivo={filtroBuscaAtivo}
                aoMudarFiltro={(novoFiltro) => setFiltroBuscaAtivo(novoFiltro)}
              />

              <TituloFiltro filtroAtivo={filtroBuscaAtivo} />

              <View className="flex-1 mt-2">
                <ListaResultadosBusca
                  filtroCategoria={filtroBuscaAtivo}
                  textoBusca={busca}
                  listaFavoritosIds={listaFavoritosIds}
                  aoAlternarFavorito={handleAlternarFavoritoClick}
                  aoClicarNaRota={handleSelecionarRotaManual}
                />
              </View>
            </View>
          ) : (
            <View className="flex-1">
              <ProximasSaidas
                filtroAtivo={filtroSelecionado}
                aoMudarFiltro={(novoFiltro) => setFiltroSelecionado(novoFiltro)}
              />

              <CarrosselRotas
                filtro={filtroSelecionado}
                estaLogado={usuarioLogado}
                recentesRodoviaria={recentesRodoviaria}
                recentesDestino={recentesDestino}
                aoClicarNaRota={(rota) =>
                  console.log("Clicou recente:", rota.destino)
                }
              />

              <RotasFavoritas
                estaLogado={usuarioLogado}
                rotasFavoritas={favoritosFiltrados}
                filtroOrigem={filtroSelecionado}
                aoClicarAdicionarFavorita={handleAdicionarFavorita}
                aoClicarNaRota={(rota) =>
                  console.log("Clicou favorito:", rota.destino)
                }
              />
            </View>
          )}
        </View>

        <MenuFooter abaAtiva="home" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
