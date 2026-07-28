import { fonts } from "@/app/_layout";
import SetaAzulSemTraço from "@/assets/icons/SetaAzulSemTraco.svg";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { MenuOpcoesBloco } from "@/components/MenuOpcoesBlocoPerfil";
import { Screen } from "@/components/safearea";
import { ToastNotificacao } from "@/components/ToastNotificacao";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🚀 Importado para ler os dados do storage
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  const router = useRouter();
  const { usuarioLogado } = useAuth();
  const params = useLocalSearchParams();

  // 🚀 Estado local para armazenar os dados do usuário do AsyncStorage
  const [dadosUsuario, setDadosUsuario] = useState<{
    name?: string;
    email?: string;
  } | null>(null);

  // 🚀 Estado local para gerenciar a exibição do Toast
  const [exibirToast, setExibirToast] = useState(false);

  // 🚀 Busca os dados do usuário salvos no AsyncStorage quando a tela carregar ou o login mudar
  useEffect(() => {
    async function carregarDadosUsuario() {
      if (usuarioLogado) {
        try {
          const userStorage = await AsyncStorage.getItem("@user");
          if (userStorage) {
            setDadosUsuario(JSON.parse(userStorage));
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário no Perfil:", error);
        }
      }
    }

    carregarDadosUsuario();
  }, [usuarioLogado]);

  // 🚀 Dispara o Toast se encontrar o parâmetro "deslogado" vindo do replace
  useEffect(() => {
    if (params?.deslogado === "true") {
      setExibirToast(true);

      // Limpa os parâmetros da URL para evitar que reative ao rotacionar a tela
      router.setParams({ deslogado: undefined });
    }
  }, [params?.deslogado]);

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

  const opcoesPerfil = [
    {
      titulo: "Dados do perfil",
      iconeNome: "person-outline" as const,
      onPress: () => router.push("/dadosPerfilDoUsuario"),
    },
    {
      titulo: "Configurações",
      iconeNome: "settings-outline" as const,
      onPress: () => router.push("/configuracoesDoUsuario"),
    },
  ];

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <Screen>
        {/* 🗺️ ÁREA DO TOPO COM O BOTÃO VOLTAR FIXO */}
        <View className="w-full px-5 pt-2 items-start justify-start">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 justify-center items-start"
            activeOpacity={0.7}
          >
            <SetaAzulSemTraço width={32} height={32} />
          </TouchableOpacity>
        </View>

        {usuarioLogado ? (
          <View className="flex-1 px-5">
            {/* 👤 FOTO DE PERFIL, NOME E EMAIL CENTRALIZADOS ABAIXO DA SETA */}
            <View className="items-center my-6">
              <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center border-4 border-slate-50 shadow-sm mb-3">
                <Ionicons name="person" size={42} color="#3F5CC4" />
              </View>

              {/* ⚡ EXIBE O NOME VINDOD DO ASYNC STORAGE */}
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xl text-slate-900 text-center"
              >
                {dadosUsuario?.name || "Usuário"}
              </Text>
            </View>

            {/* ⚙️ COMPONENTE INSTANCIADO CORRETAMENTE COM AS PROPS DE NAVEGAÇÃO */}
            <MenuOpcoesBloco opcoes={opcoesPerfil} />

            {/* 🚪 COMPONENTE AJUSTADO PARA FICAR MENOS ROBUSTO */}
            <ButtonAzulPadrao
              titulo="Sair da conta"
              onPress={handleIrParaLogout}
              style={{ marginTop: 24 }}
              icone={
                <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
              }
            />
          </View>
        ) : (
          /* 👤 CONTEÚDO DO VISITANTE SUPER OTIMIZADO */
          <View className="flex-1 px-5 pt-2 position-relative">
            {/* 🚀 TOAST EM POSIÇÃO ABSOLUTA FLUTUANDO NO TOPO DO CONTEÚDO */}
            {exibirToast && (
              <View className="absolute top-12 left-4 right-4 z-50">
                <ToastNotificacao
                  mensagem="Logout efetuado com sucesso!"
                  tipo="sucesso"
                  aoFechar={() => setExibirToast(false)}
                />
              </View>
            )}

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
