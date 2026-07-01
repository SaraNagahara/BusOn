import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Redirect, useRouter } from "expo-router";
import { useCallback } from "react"; // ⚡ Importado para congelar as funções na memória
import { Text, TouchableOpacity, View } from "react-native";
import SetaAzulSemTraço from "../../assets/icons/SetaAzulSemTraco.svg";

export default function ConfiguracoesDoUsuario() {
  const router = useRouter();
  const { usuarioLogado } = useAuth();

  if (!usuarioLogado) {
    return <Redirect href="/notfound" />;
    // Ou se preferir mandar direto pro login de uma vez: href="/loginCadastro"
  }

  // ⚡ OTIMIZAÇÃO: Memoriza a função do Footer para evitar re-renderizações lentas do menu
  const handleNavegacaoFooter = useCallback(
    (aba: TabOpcoes) => {
      if (aba === "home") {
        router.push("/inicial");
      }
      if (aba === "favoritas") {
        router.push("/favoritos");
      }
    },
    [router],
  );

  // ⚡ OTIMIZAÇÃO: Memoriza o clique de login direcionando para a rota correta
  const handleIrParaLogin = useCallback(() => {
    router.push("/loginCadastro"); // 🚀 Ajustado para a sua página correta
  }, [router]);

  // ⚡ OTIMIZAÇÃO: Memoriza o clique de termos
  const handleIrParaTermos = useCallback(() => {
    router.push("/termosDeUso");
  }, [router]);

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <Screen>
        <View className="w-full px-5 pt-2 items-start justify-start">
          <TouchableOpacity
            onPress={() => router.back()} // 🚀 Volta para a tela anterior
            className="w-12 h-12 justify-center items-start"
            activeOpacity={0.7}
          >
            <SetaAzulSemTraço width={32} height={32} />
          </TouchableOpacity>
        </View>

        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-800 text-lg">
            Página de configurações do usuario
          </Text>
        </View>

        {/* Rodapé com a indicação visual fixa na aba "perfil" */}
        <MenuFooter abaAtiva="perfil" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
