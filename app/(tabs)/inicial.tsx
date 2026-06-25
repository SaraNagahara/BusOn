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
import { Alert, TextInput, View } from "react-native"; // 👈 Importado o Alert aqui
import {
  FiltroOpcoes,
  ProximasSaidas,
} from "./../../components/proximasSaidasFiltro";
import { Screen } from "./../../components/safearea";

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
  const usuarioLogado = true; // Teste mudando para false

  // GERENCIAMENTO ÚNICO DO FOOTER COM VALIDAÇÃO DE SEGURANÇA
  const handleNavegacaoFooter = (aba: TabOpcoes) => {
    if (aba === "home") {
      // SE JÁ ESTIVER BUSCANDO, APENAS FECHA A BUSCA EM VEZ DE RECARREGAR A PÁGINA!
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

  // Regra de segurança para logout usando a função de limpar global
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

  // Lógica corrigida monitorando os dados vindos do ROTAS_MOCK unificado
  useEffect(() => {
    if (busca.trim().length === 0) return;

    const rotasFiltradas = ROTAS_MOCK.filter((rota) => {
      const atendeCategoria =
        filtroBuscaAtivo === "todas" || rota.tipo === filtroBuscaAtivo;

      const termoBusca = busca.toLowerCase();
      const destinoRota = rota.destino.toLowerCase();

      // Inteligência para bater tanto "S. João" quanto "São João"
      const atendeBusca =
        destinoRota.includes(termoBusca) ||
        (destinoRota.startsWith("s. joão") &&
          termoBusca.startsWith("sao joao"));

      return atendeCategoria && atendeBusca;
    });

    if (rotasFiltradas.length === 1) {
      const rotaEncontrada = rotasFiltradas[0];

      const novaRotaRecente: RotaFavoritaProps = {
        id: `auto_${rotaEncontrada.id}_${Date.now()}`, // ID amarrado ao ID real da rota para não dar conflito
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

  // Mapeamento dos favoritos vindos do contexto para o layout da Home 👈
  const favoritosFiltrados: RotaFavoritaProps[] = meusFavoritos.map((rota) => ({
    id: rota.id,
    destino: rota.destino,
    horario:
      filtroSelecionado === "rodoviaria"
        ? rota.horarioRodoviaria
        : rota.horarioDestino,
  }));

  // INTERAÇÃO DE FAVORITAR VIA CONTEXTO GLOBAL COM CONFIRMAÇÃO 👈
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
            aoLimpar={() => setEstaBuscando(false)} // 👈 PASSE ESSA LINHA AQUI!
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
