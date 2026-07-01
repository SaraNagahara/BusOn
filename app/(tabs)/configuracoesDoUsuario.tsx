import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { useCallback } from "react"; // ⚡ Importado para congelar as funções na memória
import { Text, TouchableOpacity, View } from "react-native";
import SetaAzulSemTraço from "../../assets/icons/SetaAzulSemTraco.svg";
import { MenuOpcoesBloco } from "../../components/MenuOpcoesBlocoPerfil";
import { fonts } from "../_layout";

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

  const opcoesConfiguracoes = [
    {
      titulo: "Alterar senha",
      iconeNome: "lock-closed-outline" as const,
      onPress: () => router.push("/alterarSenha"),
    },
    {
      titulo: "Alterar e-mail",
      iconeNome: "mail-outline" as const,
      onPress: () => router.push("/alterarEmail"),
    },
    {
      titulo: "Alterar telefone",
      iconeNome: "call-outline" as const,
      onPress: () => router.push("/alterarTelefone"),
    },
    {
      titulo: "Termos e condições",
      iconeNome: "document-text-outline" as const,
      onPress: () => router.push("/termosDeUso"),
    },
    {
      titulo: "Deletar conta",
      iconeNome: "trash-outline" as const,
      bgIconeCor: "#EF4444", // 🔴 Altera dinamicamente a cor de fundo para vermelho comercial
      onPress: () => router.push("/TemCertezaDeletarConta"),
    },
  ];

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
          <View className="items-center my-6">
            <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center border-4 border-slate-50 shadow-sm mb-3">
              <Ionicons name="person" size={42} color="#3F5CC4" />
            </View>
            <Text
              style={{ fontFamily: fonts.bold }}
              className="text-xl text-slate-900 text-center"
            >
              Fulano de Tal
            </Text>

            <MenuOpcoesBloco opcoes={opcoesConfiguracoes} />
          </View>
        </View>

        {/* Rodapé com a indicação visual fixa na aba "perfil" */}
        <MenuFooter abaAtiva="perfil" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
