import { fonts } from "@/app/_layout";
import SetaAzulSemTraço from "@/assets/icons/SetaAzulSemTraco.svg";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { MenuOpcoesBloco } from "@/components/MenuOpcoesBlocoPerfil";
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🚀 Importado para ler o storage
import { Redirect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ConfiguracoesDoUsuario() {
  const router = useRouter();
  const { usuarioLogado } = useAuth();

  // 🚀 Estado local apenas para o nome do usuário
  const [nomeUsuario, setNomeUsuario] = useState<string>("");

  // 🚀 Busca o nome do usuário salvo no AsyncStorage
  useEffect(() => {
    async function carregarNomeUsuario() {
      if (usuarioLogado) {
        try {
          const userStorage = await AsyncStorage.getItem("@user");
          if (userStorage) {
            const userParsed = JSON.parse(userStorage);
            setNomeUsuario(userParsed.name || userParsed.nome || "");
          }
        } catch (error) {
          console.error(
            "Erro ao carregar nome do usuário nas Configurações:",
            error,
          );
        }
      }
    }

    carregarNomeUsuario();
  }, [usuarioLogado]);

  // 🛡️ Ajustado para a rota padrão do seu 404 do Expo Router
  if (!usuarioLogado) {
    return <Redirect href="/notfound" />;
  }

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

  const opcoesConfiguracoes = [
    {
      titulo: "Alterar senha",
      iconeNome: "lock-closed-outline" as const,
      onPress: () =>
        router.push({
          pathname: "/recuperarSenhaparte3",
          params: { origem: "perfil" },
        }),
    },
    {
      titulo: "Alterar e-mail",
      iconeNome: "mail-outline" as const,
      onPress: () =>
        router.push({
          pathname: "/recuperarSenha",
          params: { origem: "perfil" },
        }),
    },
    {
      titulo: "Termos e condições",
      iconeNome: "document-text-outline" as const,
      onPress: () => router.push("/termosDeUso"),
    },
    {
      titulo: "Deletar conta",
      iconeNome: "trash-outline" as const,
      bgIconeCor: "#EF4444",
      onPress: () =>
        router.push({
          pathname: "/TemCertezaDeletarConta",
          params: { origem: "perfil" },
        }),
    },
  ];

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <Screen>
        {/* 🗺️ ÁREA DO TOPO FIXA */}
        <View className="w-full px-5 pt-2 items-start justify-start">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-12 h-12 justify-center items-start"
            activeOpacity={0.7}
          >
            <SetaAzulSemTraço width={32} height={32} />
          </TouchableOpacity>
        </View>

        {/* 🚀 SCROLLVIEW RESPONSIVO */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {/* 👤 AVATAR E NOME CENTRALIZADOS */}
          <View className="items-center my-6">
            <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center border-4 border-slate-50 shadow-sm mb-3">
              <Ionicons name="person" size={42} color="#3F5CC4" />
            </View>

            {/* ⚡ APENAS O NOME DO USUÁRIO VENDO DO ASYNC STORAGE */}
            <Text
              style={{ fontFamily: fonts.bold }}
              className="text-xl text-slate-900 text-center"
            >
              {nomeUsuario || "Usuário"}
            </Text>
          </View>

          {/* ⚙️ BLOCO DE MENU ADAPTÁVEL */}
          <MenuOpcoesBloco opcoes={opcoesConfiguracoes} />
        </ScrollView>

        {/* Rodapé fixo na base da tela */}
        <MenuFooter abaAtiva="perfil" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
