import { HomeHeader } from "@/components/HomeHeader";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { SearchBar } from "@/components/searchBar";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Screen } from "./../../components/safearea";

export default function Inicial() {
  const [abaAtual, setAbaAtual] = useState<TabOpcoes>("home");
  const [busca, setBusca] = useState("");

  return (
    <View className="flex-1 bg-white">
      <Screen>
        <View className="flex-1 px-2">
          {/* COMPONENTE FIXO NO TOPO */}
          <HomeHeader subtitulo="Qual o seu destino de hoje ?" />

          {/* Barra de buscar rotas */}
          <SearchBar value={busca} onChangeText={(txt) => setBusca(txt)} />

          {/* CONTEÚDO SCROLLABLE */}
          <ScrollView
            className="flex-1 px-6"
            showsVerticalScrollIndicator={false}
          >
            {/* Seus cards e conteúdos entram aqui */}
          </ScrollView>

          {/* COMPONENTE FIXO NO RODAPÉ */}
        </View>

        <MenuFooter
          abaAtiva={abaAtual}
          aoMudarAba={(novaAba) => setAbaAtual(novaAba)}
        />
      </Screen>
    </View>
  );
}
