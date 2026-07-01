import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { MenuOpcoesBloco } from "@/components/MenuOpcoesBlocoPerfil";
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import SetaAzulTraçada from "../../assets/icons/SetaAzulTraçada.svg";
import { fonts } from "./../_layout";

export default function Perfil() {
  const router = useRouter();
  const { usuarioLogado } = useAuth();

  // ⚡ OTIMIZAÇÃO: Memoriza a função do Footer
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

  // ⚡ OTIMIZAÇÃO: Cliques memorizados
  const handleIrParaLogin = useCallback(() => {
    router.push("/loginCadastro");
  }, [router]);

  const handleIrParaTermos = useCallback(() => {
    router.push("/termosDeUso");
  }, [router]);

  // 🚀 NOVAS ROTAS SOLICITADAS: Cliques do componente reaproveitável
  const handleIrParaDadosPerfil = useCallback(() => {
    router.push("/dadosPerfilDoUsuario");
  }, [router]);

  const handleIrParaConfiguracoes = useCallback(() => {
    router.push("/configuracoesDoUsuario");
  }, [router]);

  const handleIrParaLogout = useCallback(() => {
    router.push("/TemCertezaLogout");
  }, [router]);

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <Screen>
        {/* 🗺️ ÁREA DO TOPO COM O BOTÃO VOLTAR FIXO */}
        <View className="w-full px-5 pt-2 items-start justify-start">
          <TouchableOpacity
            onPress={() => router.back()} // 🚀 Volta para a tela anterior
            className="w-12 h-12 justify-center items-start"
            activeOpacity={0.7}
          >
            <SetaAzulTraçada width={32} height={32} />
          </TouchableOpacity>
        </View>

        {usuarioLogado ? (
          <View className="flex-1 px-5">
            {/* 👤 FOTO DE PERFIL, NOME E EMAIL CENTRALIZADOS ABAIXO DA SETA */}
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
            </View>

            {/* ⚙️ COMPONENTE INSTANCIADO CORRETAMENTE COM AS PROPS DE NAVEGAÇÃO */}
            <MenuOpcoesBloco
              aoClicarPerfil={handleIrParaDadosPerfil}
              aoClicarConta={handleIrParaConfiguracoes}
            />

            {/* 🚪 COMPONENTE AJUSTADO PARA FICAR MENOS ROBUSTO */}
            <ButtonAzulPadrao
              titulo="Sair da conta"
              onPress={handleIrParaLogout}
              style={{ marginTop: 24 }} // ⚡ Reduz a distância do bloco de cima para não ocupar a tela inteira
              icone={
                <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
              }
            />
          </View>
        ) : (
          /* 👤 CONTEÚDO DO VISITANTE SUPER OTIMIZADO */
          <View className="flex-1 px-5 pt-2">
            {/* 👤 HEADER DO PERFIL DE VISITANTE */}
            <View className="items-center my-6">
              <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center border-4 border-slate-50 shadow-sm mb-3">
                <Ionicons name="person-add-outline" size={42} color="#3F5CC4" />
              </View>
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xl text-slate-900"
              >
                Perfil de Convidado
              </Text>
              <Text
                style={{ fontFamily: fonts.regular }}
                className="text-sm text-slate-500 mt-0.5"
              >
                Modo de visualização limitada
              </Text>
            </View>

            {/* ⚙️ LISTA DE OPÇÕES / MENU */}
            <View className="flex-1 mt-4">
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xs text-slate-400 uppercase tracking-widest mb-3 px-1"
              >
                Geral
              </Text>

              {/* Link para Termos de Uso e Política de Privacidade */}
              <Pressable
                onPress={handleIrParaTermos}
                className="flex-row items-center justify-between bg-slate-50 p-4 rounded-2xl mb-3 active:bg-slate-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-blue-50 p-2 rounded-xl">
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color="#3F5CC4"
                    />
                  </View>
                  <Text
                    style={{ fontFamily: fonts.medium }}
                    className="text-slate-800 text-base"
                  >
                    Termos e Privacidade
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </Pressable>

              {/* 🚪 BOTÃO DE ENTRAR COM A CONTA */}
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xs text-slate-400 uppercase tracking-widest mt-4 mb-3 px-1"
              >
                Conta
              </Text>

              {/* 🎨 Cor alterada para #1D61E7 casando com o ButtonAzulPadrao */}
              <Pressable
                onPress={handleIrParaLogin}
                className="flex-row items-center justify-between bg-[#1D61E7] p-4 rounded-2xl active:bg-[#154cb8]"
              >
                <View className="flex-row items-center gap-3">
                  <View className="bg-white/20 p-2 rounded-xl">
                    <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
                  </View>
                  <Text
                    style={{ fontFamily: fonts.bold }}
                    className="text-white text-base"
                  >
                    Entrar com minha conta
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        )}

        {/* Rodapé com a indicação visual fixa na aba "perfil" */}
        <MenuFooter abaAtiva="perfil" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
