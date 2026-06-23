import { CarrosselRotas } from "@/components/CarrosselRotas";
import { HomeHeader } from "@/components/HomeHeader";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { RotaFavoritaProps, RotasFavoritas } from "@/components/RotasFavoritas";
import { SearchBar } from "@/components/searchBar";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import {
  FiltroOpcoes,
  ProximasSaidas,
} from "./../../components/proximasSaidasFiltro";
import { Screen } from "./../../components/safearea";

export default function Inicial() {
  const router = useRouter();

  const [abaAtual, setAbaAtual] = useState<TabOpcoes>("home");
  const [busca, setBusca] = useState("");
  const [filtroSelecionado, setFiltroSelecionado] =
    useState<FiltroOpcoes>("rodoviaria");

  // Mantido em false para testar o redirecionamento do usuário deslogado
  const [usuarioLogado, setUsuarioLogado] = useState(true);

  const [meusFavoritos, setMeusFavoritos] = useState<RotaFavoritaProps[]>([
    { id: "f1", destino: "Guaçu", horario: "16:15" },
    { id: "f2", destino: "Canguera", horario: "16:30" },
    { id: "f3", destino: "Mailasqui", horario: "17:40" },
    { id: "f4", destino: "S. João novo", horario: "18:00" },
    { id: "f5", destino: "Sorocaba", horario: "19:15" },
  ]);

  const [recentesRodoviaria, setRecentesRodoviaria] = useState<
    RotaFavoritaProps[]
  >([
    { id: "rr1", destino: "Mailasqui", horario: "14:20" },
    { id: "rr2", destino: "Canguera", horario: "15:10" },
    { id: "rr3", destino: "Guaçu", horario: "16:00" },
    { id: "rr4", destino: "S. João novo", horario: "16:45" },
  ]);

  const [recentesDestino, setRecentesDestino] = useState<RotaFavoritaProps[]>([
    { id: "rd1", destino: "Sorocaba", horario: "12:30" },
    { id: "rd2", destino: "São Paulo", horario: "13:45" },
    { id: "rd3", destino: "Mairinque", horario: "17:15" },
    { id: "rd4", destino: "Ibiúna", horario: "18:50" },
  ]);

  // ALTERADO AQUI: Lógica de clique direcionando para a nova tela baseada na image_42084a.png
  const handleAdicionarFavorita = () => {
    if (!usuarioLogado) {
      console.log("Usuário deslogado! Redirecionando para criar conta...");

      // Insira o caminho exato do arquivo que você criou (ex: /solicitar-conta, /auth/aviso)
      router.push("/SolicitarConta");
    } else {
      console.log("Abrir tela de escolher rota para favoritar");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Screen>
        <View className="flex-1 px-4 pb-2">
          <HomeHeader subtitulo="Qual o seu destino de hoje ?" />
          <SearchBar value={busca} onChangeText={(txt) => setBusca(txt)} />

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
            rotasFavoritas={meusFavoritos}
            aoClicarAdicionarFavorita={handleAdicionarFavorita} // Propriedade acionando a função corrigida
            aoClicarNaRota={(rota) => {
              router.push({
                pathname: "/detalhesDaRota",
                params: {
                  id: rota.id,
                  destino: rota.destino,
                  horario: rota.horario,
                },
              });
            }}
          />
        </View>

        <MenuFooter
          abaAtiva={abaAtual}
          aoMudarAba={(novaAba) => setAbaAtual(novaAba)}
        />
      </Screen>
    </View>
  );
}
