import { useAuth } from "@/context/AuthProvider";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import ButtonAzulPadrao from "./../../components/buttonAzulPadrao";
import { Screen } from "./../../components/safearea";

export default function ContaDeletadaSucesso() {
  const router = useRouter();
  const { setUsuarioLogado } = useAuth();

  useEffect(() => {
    if (setUsuarioLogado) {
      setUsuarioLogado(false);
    }

    const acaoBotaoVoltar = () => {
      router.replace("/inicial");
      return true;
    };

    const assinaturaBackHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      acaoBotaoVoltar,
    );

    return () => assinaturaBackHandler.remove();
  }, [setUsuarioLogado]);

  return (
    <View className="flex-1 bg-[#F8FAFC] justify-center px-6">
      <Screen>
        <View className="flex-1 justify-center items-center">
          {/* 🔘 ÍCONE DE CHECK CIRCULAR (Conforme imagem image_a2e74b.png) */}
          <View className="w-36 h-36 border-2 border-[#2563EB] rounded-full items-center justify-center mb-10">
            <Feather name="check" size={70} color="#2563EB" />
          </View>

          {/* 📝 TÍTULO PRINCIPAL NEGRITO */}
          <Text className="text-[#1A1C1E] text-3xl font-extrabold text-center mb-4 px-2">
            A conta foi excluída com sucesso!
          </Text>

          {/* ℹ️ TEXTO DESCRITIVO INFERIOR */}
          <Text className="text-[#64748B] text-base text-center leading-6 px-6 pb-4">
            Por favor volte para home ou cadastre-se novamente
          </Text>

          {/* 🚀 ESPAÇAMENTO ADICIONADO: Desgruda o texto de cima dos botões (mb-16 dá um ótimo espaço responsivo) */}
          <View className="w-full mb-16" />

          {/* ⚪ BOTÃO SECUNDÁRIO: VOLTAR PARA HOME (Corrigido fiel à imagem image_a2e74b.png) */}
          <TouchableOpacity
            onPress={() => router.replace("/inicial")} // 🎯 Redirecionando corretamente para /inicial
            activeOpacity={0.8}
            className="w-full bg-white border border-[#D1D5DB] rounded-3xl py-4 items-center justify-center mb-4"
            style={{ height: 56 }}
          >
            <Text className="text-[#2563EB] text-lg font-bold">
              Voltar para Home
            </Text>
          </TouchableOpacity>

          {/* 🔵 BOTÃO PRINCIPAL: CADASTRAR NOVO PERFIL */}
          <View className="w-full">
            <ButtonAzulPadrao
              titulo="Cadastrar novo perfil"
              onPress={() => router.replace("/loginCadastro")}
            />
          </View>
        </View>
      </Screen>
    </View>
  );
}
