import { fonts } from "@/app/_layout";
import SetaAzulSemTraço from "@/assets/icons/SetaAzulSemTraco.svg";
import ButtonAzulPadrao from "@/components/buttonAzulPadrao";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { MenuOpcoesBloco } from "@/components/MenuOpcoesBlocoPerfil";
import { Screen } from "@/components/safearea";
import { ToastNotificacao } from "@/components/ToastNotificacao";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Perfil() {
  const router = useRouter();
  const { usuarioLogado, user } = useAuth();
  const params = useLocalSearchParams();

  const [exibirToast, setExibirToast] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Reset do estado ao retornar para a tela de Perfil (caso o usuário use o goBack no Login)
  useFocusEffect(
    useCallback(() => {
      setIsNavigating(false);
    }, []),
  );

  useEffect(() => {
    if (params?.deslogado === "true") {
      setExibirToast(true);
      router.setParams({ deslogado: undefined });
    }
  }, [params?.deslogado, router]);

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

  // 🚀 Mantém a tela de Perfil na pilha usando router.push para que o goBack() continue funcionando!
  const handleIrParaLogin = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);

    // 🚀 Executa a navegação após o feedback visual do toque ser desenhado
    requestAnimationFrame(() => {
      router.push("/loginCadastro");
    });
  }, [router, isNavigating]);

  const handleIrParaTermos = useCallback(() => {
    router.push("/termosDeUso");
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
        {/* ÁREA DO TOPO */}
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
            <View className="items-center my-6">
              <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center border-4 border-slate-50 shadow-sm mb-3">
                <Ionicons name="person" size={42} color="#3F5CC4" />
              </View>

              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xl text-slate-900 text-center"
              >
                {user?.name || "Usuário"}
              </Text>
            </View>

            <MenuOpcoesBloco opcoes={opcoesPerfil} />

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
          /* VISITANTE */
          <View className="flex-1 px-5 pt-2 position-relative">
            {exibirToast && (
              <View className="absolute top-12 left-4 right-4 z-50">
                <ToastNotificacao
                  mensagem="Logout efetuado com sucesso!"
                  tipo="sucesso"
                  aoFechar={() => setExibirToast(false)}
                />
              </View>
            )}

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

            <View className="flex-1 mt-4">
              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xs text-slate-400 uppercase tracking-widest mb-3 px-1"
              >
                Geral
              </Text>

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

              <Text
                style={{ fontFamily: fonts.bold }}
                className="text-xs text-slate-400 uppercase tracking-widest mt-4 mb-3 px-1"
              >
                Conta
              </Text>

              <TouchableOpacity
                onPress={handleIrParaLogin}
                disabled={isNavigating}
                activeOpacity={0.7}
                className={`flex-row items-center justify-between bg-[#1D61E7] p-4 rounded-2xl ${
                  isNavigating ? "opacity-70" : ""
                }`}
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

                {isNavigating ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}

        <MenuFooter abaAtiva="perfil" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
