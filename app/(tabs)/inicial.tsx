import { CarrosselRotas } from "@/components/CarrosselRotas";
import { FiltroBusca, TipoLinhaOpcoes } from "@/components/FiltroBusca";
import { HomeHeader } from "@/components/HomeHeader";
import {
  ListaResultadosBusca,
  RotaResultadoProps,
} from "@/components/ListaResultadosBusca";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { RotaFavoritaProps, RotasFavoritas } from "@/components/RotasFavoritas";
import { SearchBar } from "@/components/searchBar";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import {
  FiltroOpcoes,
  ProximasSaidas,
} from "./../../components/proximasSaidasFiltro";
import { Screen } from "./../../components/safearea";
import { TituloFiltro } from "./../../components/TituloFiltro";
import { fonts } from "./../_layout";

interface RotaFavoritaDinamicaProps {
  id: string;
  destino: string;
  horarioRodoviaria: string;
  horarioDestino: string;
}

// Copiado aqui apenas para referência de filtro dentro da Inicial
const ROTAS_FICTICIAS: RotaResultadoProps[] = [
  {
    id: "1",
    destino: "Canguera",
    origem: "Terminal de São Roque",
    proximoHorario: "18:10",
    tipo: "urbanas",
  },
  {
    id: "2",
    destino: "Sorocaba",
    origem: "Terminal de São Roque",
    proximoHorario: "16:10",
    tipo: "intermunicipais",
  },
  {
    id: "3",
    destino: "Guaçu",
    origem: "Terminal de São Roque",
    proximoHorario: "17:35",
    tipo: "urbanas",
  },
  {
    id: "4",
    destino: "Mairinque",
    origem: "Terminal de São Roque",
    proximoHorario: "15:45",
    tipo: "intermunicipais",
  },
  {
    id: "5",
    destino: "Mailasqui",
    origem: "Terminal de São Roque",
    proximoHorario: "19:00",
    tipo: "urbanas",
  },
  {
    id: "6",
    destino: "São João novo",
    origem: "Terminal de São Roque",
    proximoHorario: "20:15",
    tipo: "urbanas",
  },
  {
    id: "7",
    destino: "São Paulo",
    origem: "Terminal de São Roque",
    proximoHorario: "06:30",
    tipo: "intermunicipais",
  },
  {
    id: "8",
    destino: "Ibiúna",
    origem: "Terminal de São Roque",
    proximoHorario: "21:40",
    tipo: "intermunicipais",
  },
];

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

  // CONTROLE DE LOGIN
  const [usuarioLogado, setUsuarioLogado] = useState(false);

  // Inicializa vazio para favoritos
  const [meusFavoritos, setMeusFavoritos] = useState<
    RotaFavoritaDinamicaProps[]
  >([]);

  // Regra de segurança para logout
  useEffect(() => {
    if (!usuarioLogado) {
      setMeusFavoritos([]);
    }
  }, [usuarioLogado]);

  // Histórico de buscas do Carrossel (inicia com os padrões)
  const [recentesRodoviaria, setRecentesRodoviaria] = useState<
    RotaFavoritaProps[]
  >([
    { id: "1", destino: "S. João novo", horario: "15:30" },
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

  // Nova lógica: Monitora a digitação e adiciona automaticamente se encontrar somente UMA rota correspondente
  useEffect(() => {
    if (busca.trim().length === 0) return;

    // Filtra baseado no que está digitado no momento
    const rotasFiltradas = ROTAS_FICTICIAS.filter((rota) => {
      const atendeCategoria =
        filtroBuscaAtivo === "todas" || rota.tipo === filtroBuscaAtivo;
      const atendeBusca = rota.destino
        .toLowerCase()
        .includes(busca.toLowerCase());
      return atendeCategoria && atendeBusca;
    });

    // REGRA SOLICITADA: Se aparecer somente UMA rota no filtro, ela vai direto para o histórico
    if (rotasFiltradas.length === 1) {
      const rotaEncontrada = rotasFiltradas[0];

      const novaRotaRecente: RotaFavoritaProps = {
        id: `auto_${Date.now()}`,
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
          return [novaRotaRecente, ...filtrados]; // Joga para o carrossel na posição 0
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
  }, [busca, filtroBuscaAtivo]); // Executa toda vez que o usuário digita ou muda o filtro de busca

  // Mapeamento dos favoritos para o layout
  const favoritosFiltrados: RotaFavoritaProps[] = meusFavoritos.map((rota) => ({
    id: rota.id,
    destino: rota.destino,
    horario:
      filtroSelecionado === "rodoviaria"
        ? rota.horarioRodoviaria
        : rota.horarioDestino,
  }));

  const listaFavoritosIds = meusFavoritos.map((f) => f.id);

  // INTERAÇÃO DE FAVORITAR NO CORAÇÃO
  const handleAlternarFavorito = (id: string, destino: string) => {
    if (!usuarioLogado) {
      router.push("/SolicitarConta");
      return;
    }

    if (listaFavoritosIds.includes(id)) {
      setMeusFavoritos((prev) => prev.filter((item) => item.id !== id));
    } else {
      const novoFavorito: RotaFavoritaDinamicaProps = {
        id: id,
        destino: destino,
        horarioRodoviaria: "18:20",
        horarioDestino: "09:45",
      };
      setMeusFavoritos((prev) => [...prev, novoFavorito]);
    }
  };

  // Clique manual na lista (caso o usuário queira fechar a busca clicando)
  const handleSelecionarRotaManual = (rota: any) => {
    handleSairDaBusca();
  };

  // INTERAÇÃO DO BOTÃO "ADICIONAR FAVORITA"
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
          />

          {estaBuscando ? (
            <View className="flex-1 mt-4">
              <Pressable
                onPress={handleSairDaBusca}
                className="flex-row items-center gap-2 mb-2 active:opacity-70"
              >
                <Ionicons name="arrow-back" size={20} color="#64748B" />
                <Text
                  style={{ fontFamily: fonts.medium }}
                  className="text-[#64748B] text-base"
                >
                  Voltar para o início
                </Text>
              </Pressable>

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
                  aoAlternarFavorito={handleAlternarFavorito}
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

        <MenuFooter
          abaAtiva={abaAtual}
          aoMudarAba={(novaAba) => setAbaAtual(novaAba)}
        />
      </Screen>
    </View>
  );
}
