import { fonts } from "@/app/_layout";
import SetaAzulSemTraço from "@/assets/icons/SetaAzulSemTraco.svg";
import { DadosPessoaisCard } from "@/components/DadosPessoaisCard";
import { MenuFooter, TabOpcoes } from "@/components/MenuFooter";
import { Screen } from "@/components/safearea";
import { useAuth } from "@/context/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 🚀 Importado para ler o storage
import { Redirect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface UserStorageData {
  nome?: string;
  name?: string;
  email?: string;
  telefone?: string;
  phone?: string;
}

export default function DadosPerfilDoUsuario() {
  const router = useRouter();
  const { usuarioLogado } = useAuth();

  // 🚀 Estado para armazenar os dados lidos do AsyncStorage
  const [dadosUsuario, setDadosUsuario] = useState<UserStorageData | null>(
    null,
  );

  // 🚀 Efeito para carregar as informações do AsyncStorage
  useEffect(() => {
    async function carregarDadosStorage() {
      if (usuarioLogado) {
        try {
          const userStorage = await AsyncStorage.getItem("@user");
          if (userStorage) {
            setDadosUsuario(JSON.parse(userStorage));
          }
        } catch (error) {
          console.error("Erro ao carregar dados do usuário no storage:", error);
        }
      }
    }

    carregarDadosStorage();
  }, [usuarioLogado]);

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

  // ⚡ Mapeamento dos dados para garantir compatibilidade com as props do Card
  const usuarioFormatado = {
    nome: dadosUsuario?.nome || dadosUsuario?.name || "Usuário",
    email: dadosUsuario?.email || "",
    telefone: dadosUsuario?.telefone || dadosUsuario?.phone || undefined,
  };

  return (
    <View className="flex-1 bg-[#F2F2F7]">
      <Screen>
        <View className="w-full px-5 pt-2 items-start justify-start">
          <TouchableOpacity
            onPress={() => router.back()}
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

            {/* ⚡ NOME DINÂMICO DO USUÁRIO */}
            <Text
              style={{ fontFamily: fonts.bold }}
              className="text-xl text-slate-900 text-center"
            >
              {usuarioFormatado.nome}
            </Text>
          </View>

          {/* ⚡ CARD EXIBINDO OS DADOS REAIS DO ASYNC STORAGE */}
          <DadosPessoaisCard usuario={usuarioFormatado} />
        </View>

        {/* Rodapé com a indicação visual fixa na aba "perfil" */}
        <MenuFooter abaAtiva="perfil" aoMudarAba={handleNavegacaoFooter} />
      </Screen>
    </View>
  );
}
